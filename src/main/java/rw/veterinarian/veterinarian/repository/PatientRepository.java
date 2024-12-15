package rw.veterinarian.veterinarian.repository;

import rw.veterinarian.veterinarian.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
