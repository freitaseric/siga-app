package br.gov.rr.canta.siga.backend.model.producer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property {
    private String name;
    private BigDecimal totalAreaHa;
    private String location;
    private String propertyType;
    private String registrationNumber;
}
