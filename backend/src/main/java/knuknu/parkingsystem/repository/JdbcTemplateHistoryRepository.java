package knuknu.parkingsystem.repository;

import java.io.File;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

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
	// 내부 분리 가능
	public int save(HistoryForm historyForm) {
		KeyHolder keyHolder = new GeneratedKeyHolder();
		String sql = "";

		jdbcTemplate.update(connection -> {
			PreparedStatement pstmt = connection.prepareStatement(
					"INSERT INTO HISTORY(admin_id, park_area, park_spot, car_region_no, car_no, enter_time) VALUES(?, ?, ?, (SELECT region_no FROM CAR_REGION WHERE region_name = ?), ?, ?)",
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setString(1, historyForm.getAdmin_id());
			pstmt.setByte(2, historyForm.getPark_area());
			pstmt.setByte(3, historyForm.getPark_spot());
			pstmt.setString(4, historyForm.getCar_region_name());
			pstmt.setString(5, historyForm.getCar_no());
			pstmt.setTimestamp(6, Timestamp.valueOf(historyForm.getEnter_time()));
			return pstmt;
		}, keyHolder);

		MultipartFile file = historyForm.getPhoto();
		String origin = file.getOriginalFilename();
		String ext = origin.substring(origin.lastIndexOf("."));

		// 폴더 생성
		String filepath = makeDir();

		// 중복 파일 처리
		String uuid = UUID.randomUUID().toString();
		// Windows
		// String savename = filepath + "\\" + uuid + ext;
		// Ubuntu
		String savename = filepath + "/" + uuid + ext;

		// 콘솔 출력
		// System.out.println(filename);
		// System.out.println(filepath);
		// System.out.println(uuid);
		// System.out.println(savename);

		File save = new File(savename);

		try {
			file.transferTo(save);
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}

		/*
		 * String uploadFolder = "C:\\ProgramData\\MySQL\\MySQL Server 8.3\\Uploads\\";
		 * MultipartFile multipartFile = historyForm.getPhoto(); File saveFile = new
		 * File(uploadFolder, multipartFile.getOriginalFilename()); try {
		 * multipartFile.transferTo(saveFile); } catch(Exception e) {
		 * System.err.println(e.getMessage()); }
		 */

		sql = "INSERT INTO PARK_IMAGE VALUES(?, ?)";
		jdbcTemplate.update(sql, keyHolder.getKey(), uuid + ext);

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

	private String makeDir() {
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd");
		String now = sdf.format(date);

		// Windows
		// String path = "C:\\Spring-study" + "\\" + now;
		// Ubuntu
		String path = "/home/bong19262/images" + "/" + now;
		File file = new File(path);

		if (file.exists() == false)
			file.mkdir();

		return path;
	}
}
