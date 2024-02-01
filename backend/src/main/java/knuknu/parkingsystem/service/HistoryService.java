package knuknu.parkingsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import knuknu.parkingsystem.domain.History;
import knuknu.parkingsystem.repository.HistoryRepository;

@Service
public class HistoryService {
	private final HistoryRepository historyRepository;
	
	@Autowired
	public HistoryService(HistoryRepository historyRepository)
	{
		this.historyRepository = historyRepository;
	}
	
	// 주차
	public int park(History history)
	{
		historyRepository.save(history);
		return history.getId();
	}
	
	// 전체 주차 내역 조회
	public List<History> findHistories()
	{
		return historyRepository.findAll();
	}
	
	public List<History> findUnpaid()
	{
		return historyRepository.findNotPaid()
;	}
}
