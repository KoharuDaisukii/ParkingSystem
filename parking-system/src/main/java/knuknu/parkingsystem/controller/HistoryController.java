package knuknu.parkingsystem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import knuknu.parkingsystem.domain.History;
import knuknu.parkingsystem.service.HistoryService;

@RestController
public class HistoryController {
	private final HistoryService historyService;

	@Autowired
	public HistoryController(HistoryService historyService) {
		this.historyService = historyService;
	}

	@GetMapping("/history")
	public List<History> readAll() {
		List<History> histories = historyService.findHistories();
		return histories;
	}

	@GetMapping("/history/unpaid")
	public List<History> readUnpaid() {
		List<History> histories = historyService.findUnpaid();
		return histories;
	}

	@GetMapping(value = "/image", produces = MediaType.IMAGE_JPEG_VALUE)
	public byte[] getImage(@RequestParam(value = "id", defaultValue = "1") int id) {
		return historyService.findImage(id);
	}
}
