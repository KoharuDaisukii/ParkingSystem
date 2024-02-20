package knuknu.parkingsystem.repository;

import java.util.List;
import java.util.Optional;

import knuknu.parkingsystem.controller.ExitTimeUpdateForm;
import knuknu.parkingsystem.controller.HistoryForm;
import knuknu.parkingsystem.domain.History;

public interface HistoryRepository {
	int save(HistoryForm historyForm);
	Optional<History> updateExitTime(ExitTimeUpdateForm exitTimeUpdateForm);
	Optional<History> findHistoryById(int id);
	byte[] findPhotoById(int id, byte res);
	List<History> findByAdminID(String admin_id);
	List<History> findByCarID(String car_no);
	List<History> findAll();
	List<History> findNotPaid();
}
