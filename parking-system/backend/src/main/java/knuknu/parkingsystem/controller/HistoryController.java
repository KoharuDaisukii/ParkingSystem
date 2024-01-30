package knuknu.parkingsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import knuknu.parkingsystem.domain.History;
import knuknu.parkingsystem.service.HistoryService;

@RestController
public class HistoryController {
	private final HistoryService historyService;
	
	@Autowired
	public HistoryController(HistoryService historyService)
	{
		this.historyService = historyService;
	}
	
	@GetMapping("/history")
	public List<History> readAll()
	{
		List<History> histories = historyService.findHistories();
		return histories;
	}
	
	@GetMapping("/history/unpaid")
	public List<History> readUnpaid()
	{
		List<History> histories = historyService.findUnpaid();
		return histories;
	}
}
