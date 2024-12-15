package rw.veterinarian.veterinarian.repository;

import rw.veterinarian.veterinarian.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}