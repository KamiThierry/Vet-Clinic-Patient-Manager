package rw.veterinarian.veterinarian.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;
    private LocalDateTime appointmentDate;
    private String doctorName;
    private String status;

    // Getters and Setters
}
