package br.gov.rr.canta.siga.backend.model.service;

import br.gov.rr.canta.siga.backend.model.producer.Producer;
import br.gov.rr.canta.siga.backend.model.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "service_records")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ServiceRecord {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull(message = "Service date is required")
    @Column(nullable = false)
    private LocalDateTime date;

    @NotNull(message = "Producer is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producer_id", nullable = false)
    private Producer producer;

    @NotNull(message = "Technician is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "technician_id", nullable = false)
    private User technician;

    @NotBlank(message = "Service category is required")
    @Column(name = "service_category", nullable = false, length = 255)
    private String serviceCategory;

    @Positive(message = "Area must be positive")
    @Column(name = "area_to_work_ha", precision = 10, scale = 2)
    private BigDecimal areaToWorkHa;

    @Column(name = "crop_to_be_planted", length = 255)
    private String cropToBePlanted;

    @ElementCollection
    @CollectionTable(name = "service_records_executed_services", 
                     joinColumns = @JoinColumn(name = "service_record_id"))
    @Column(name = "executed_service")
    private Set<String> executedServices;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @NotBlank(message = "Status is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ServiceStatus status;

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
