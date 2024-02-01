package knuknu.parkingsystem.controller;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class HistoryForm {
	private String admin_id;
	private byte park_area;
	private byte park_spot;
	private String car_region_name;
	private String car_no;
	private Timestamp enter_time;
	private Byte[] photo;
}
