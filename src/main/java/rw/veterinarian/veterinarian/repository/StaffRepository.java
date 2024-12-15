package rw.veterinarian.veterinarian.repository;

import rw.veterinarian.veterinarian.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Long> {
}
