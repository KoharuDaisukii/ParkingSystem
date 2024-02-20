package knuknu.parkingsystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import knuknu.parkingsystem.controller.ExitTimeUpdateForm;
import knuknu.parkingsystem.controller.HistoryForm;
import knuknu.parkingsystem.domain.History;
import knuknu.parkingsystem.repository.HistoryRepository;

@Service
public class HistoryService {
	private final HistoryRepository historyRepository;

	@Autowired
	public HistoryService(HistoryRepository historyRepository) {
		this.historyRepository = historyRepository;
	}

	// 주차
	public int parkIn(HistoryForm historyForm) {
		return historyRepository.save(historyForm);
	}
	
	// 출차
	public Optional<History> parkOut(ExitTimeUpdateForm exitTimeUpdateForm) {
		return historyRepository.updateExitTime(exitTimeUpdateForm);
	}

	// 전체 주차 내역 조회
	public List<History> findHistories() {
		return historyRepository.findAll();
	}

	// 미납 차랑 조회
	public List<History> findUnpaid() {
		return historyRepository.findNotPaid();
	}
	
	// 사진 조회
	public byte[] findImage(int id, byte res){
		return historyRepository.findPhotoById(id, res);
	}

	public Optional<History> findHistoryById(int id) {
		return historyRepository.findHistoryById(id);
	}
}
