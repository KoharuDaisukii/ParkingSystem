package knuknu.parkingsystem.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import knuknu.parkingsystem.controller.HistoryForm;
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
	public int save(HistoryForm historyForm) {
	KeyHolder keyHolder = new GeneratedKeyHolder();
		String sql = "";
		
		jdbcTemplate.update( connection -> {
	        PreparedStatement pstmt = connection.prepareStatement("INSERT INTO HISTORY(admin_id, park_area, park_spot, car_region_no, car_no, enter_time) VALUES(?, ?, ?, (SELECT region_no FROM CAR_REGION WHERE region_name = ?), ?, ?)", Statement.RETURN_GENERATED_KEYS );
	        pstmt.setString(1, historyForm.getAdmin_id());
	        pstmt.setByte(2, historyForm.getPark_area());
	        pstmt.setByte(3, historyForm.getPark_spot());
	        pstmt.setString(4, historyForm.getCar_region_name());
	        pstmt.setString(5, historyForm.getCar_no());
	        pstmt.setTimestamp(6, historyForm.getEnter_time());
	          return pstmt;
	        }, keyHolder );
		sql = "INSERT INTO PARK_IMAGE VALUES(?, ?)";
		jdbcTemplate.update(sql, keyHolder.getKey(), historyForm.getPhoto());
		
		return 1;
	}

	@Override
	public Optional<History> findHistoryById(int id) {
		List<History> result = jdbcTemplate.query("SELECT * FROM HISTORY WHERE id = ?", historyRowMapper(), id);
		return result.stream().findAny();
	}
	
	@Override
	public byte[] findPhotoById(int id) {
		String sql = "SELECT photo FROM PARK_IMAGE WHERE history_id = ?";
		byte[] result = jdbcTemplate.queryForObject(sql, byte[].class, id);
		return result;
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
				history.setPark_area(rs.getByte("park_area"));
				history.setPark_spot(rs.getByte("park_spot"));
				history.setCar_region_no(rs.getByte("car_region_no"));
				history.setCar_no(rs.getString("car_no"));
				history.setEnter_time(rs.getTimestamp("enter_time"));
				history.setExit_time(rs.getTimestamp("exit_time"));
				return history;
			}
		};
	}
}
