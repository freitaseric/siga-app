package br.gov.rr.canta.siga.backend.controller.dto.user;

import br.gov.rr.canta.siga.backend.model.user.BankDetails;
import br.gov.rr.canta.siga.backend.model.user.User;

import java.util.Optional;

public record CreateUserRequestDto(
        String name,
        String email,
        String password,
        String cpf,
        String role,
        Optional<String> photoUrl,
        Optional<BankDetails> bankDetails
) {
    public User toModel() {
        return User.builder()
                .name(name)
                .email(email)
                .password(password)
                .cpf(cpf)
                .role(role)
                .photoUrl(photoUrl.orElse(null))
                .bankDetails(bankDetails.orElse(null))
                .build();
    }
}
