package br.gov.rr.canta.siga.backend.model.producer;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "producers")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Producer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false, length = 255)
    private String name;

    @NotBlank(message = "CPF is required")
    @Pattern(regexp = "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "CPF must be in format XXX.XXX.XXX-XX")
    @Column(unique = true, nullable = false, length = 14)
    private String cpf;

    @Pattern(regexp = "\\+?\\d{1,3}?\\s?\\(?\\d{2}\\)?\\s?\\d{4,5}-?\\d{4}",
            message = "Phone number must be in valid format")
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @JdbcTypeCode(SqlTypes.JSON)
    private Address address;

    @JdbcTypeCode(SqlTypes.JSON)
    private Property property;

    @Column(name = "created_at", updatable = false, nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
