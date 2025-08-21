package br.gov.rr.canta.siga.backend.model.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BankDetails {
    private String bank;
    private String agency;
    private String account;
    private String accountType;
}
