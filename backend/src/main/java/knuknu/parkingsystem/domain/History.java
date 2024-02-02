package knuknu.parkingsystem.domain;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class History {
	private int id;
	private String admin_id;
	private byte park_area;
	private byte park_spot;
	private byte car_region_no;
	private String car_no;
	private Timestamp enter_time;
	private Timestamp exit_time;
}