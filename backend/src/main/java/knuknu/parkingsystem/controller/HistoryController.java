package knuknu.parkingsystem.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

	@GetMapping("/history/all")
	public List<History> readAll() {
		List<History> histories = historyService.findHistories();
		return histories;
	}
	
	@GetMapping("/history")
	public Optional<History> readHistoryById(@RequestParam("id") int id)
	{
		return historyService.findHistoryById(id);
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
	
	@PostMapping(value = "/park/in", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public int createHistory(@ModelAttribute HistoryForm historyForm)
	{
		return historyService.parkIn(historyForm);
	}
	
	@PutMapping("/park/out")
	public Optional<History> updateExitTime(ExitTimeUpdateForm exitTimeUpdateForm)
	{
		return historyService.parkOut(exitTimeUpdateForm.getId(), exitTimeUpdateForm.getExit_time());
	}
}
