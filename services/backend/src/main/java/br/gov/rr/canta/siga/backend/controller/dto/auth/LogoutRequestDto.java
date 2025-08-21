package br.gov.rr.canta.siga.backend.controller.dto.auth;

public record LogoutRequestDto(String accessToken, String refreshToken) {
}
