package rw.veterinarian.veterinarian.model;

import jakarta.persistence.*;

@Entity
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role;
    private String email;

    // Getters and Setters
}