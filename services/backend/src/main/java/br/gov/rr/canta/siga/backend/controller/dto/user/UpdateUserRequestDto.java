package br.gov.rr.canta.siga.backend.controller.dto.user;

import br.gov.rr.canta.siga.backend.model.user.BankDetails;

import java.util.Optional;

public record UpdateUserRequestDto(
        Optional<String> name,
        Optional<String> email,
        Optional<String> cpf,
        Optional<String> role,
        Optional<String> photoUrl,
        Optional<BankDetails> bankDetails
) {
}