package knuknu.parkingsystem.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import knuknu.parkingsystem.domain.History;

@Repository
public class JdbcTemplateHistoryRepository implements HistoryRepository {
	private final JdbcTemplate jdbcTemplate;

	@Autowired
	public JdbcTemplateHistoryRepository(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	// Exception handling ㅇㄷ?
	public int save(History history) {
		String sql = "INSERT INTO HISTORY(admin_id, car_no, enter_time, photo) VALUES(?, ?, ?, ?)";
		return jdbcTemplate.update(sql, history.getAdmin_id(), history.getCar_no(), history.getEnter_time(), history.getPhoto());
	}

	@Override
	public Optional<History> findById(int id) {
		List<History> result = jdbcTemplate.query("SELECT * FROM HISTORY WHERE id = ?", historyRowMapper(), id);
		return result.stream().findAny();
	}

	@Override
	public List<History> findByAdminID(String admin_id) {
		return jdbcTemplate.query("SELECT * FROM HISTORY WHERE admin_id = ?", historyRowMapper(), admin_id);
	}

	@Override
	public List<History> findByCarID(String car_no) {
		return jdbcTemplate.query("SELECT * FROM HISTORY WHERE car_no = ?", historyRowMapper(), car_no);
	}

	@Override
	public List<History> findAll() {
		return jdbcTemplate.query("SELECT * FROM HISTORY", historyRowMapper());
	}

	@Override
	public List<History> findNotPaid() {
		return jdbcTemplate.query("SELECT * FROM HISTORY WHERE exit_time IS NULL", historyRowMapper());
	}
	
	private RowMapper<History> historyRowMapper() {
		return new RowMapper<History>() {
			@Override
			public History mapRow(ResultSet rs, int rowNum) throws SQLException {
				History history = new History();
				history.setId(rs.getInt("id"));
				history.setAdmin_id(rs.getString("admin_id"));
				history.setCar_no(rs.getString("car_no"));
				history.setEnter_time(rs.getTimestamp("enter_time"));
				history.setExit_time(rs.getTimestamp("exit_time"));
				history.setPhoto(rs.getBytes("photo"));
				return history;
			}
		};
	}
}
