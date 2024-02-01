package knuknu.parkingsystem.repository;

import java.util.List;
import java.util.Optional;

import knuknu.parkingsystem.domain.History;

public interface HistoryRepository {
	int save(History history);
	Optional<History> findById(int id);
	List<History> findByAdminID(String admin_id);
	List<History> findByCarID(String car_no);
	List<History> findAll();
	List<History> findNotPaid();
}
