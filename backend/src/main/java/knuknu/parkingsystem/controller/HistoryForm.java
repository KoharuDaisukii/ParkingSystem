package knuknu.parkingsystem.controller;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class HistoryForm {
	private String admin_id;
	private byte park_area;
	private byte park_spot;
	private String car_no;
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime enter_time;
	private MultipartFile photo;
}
