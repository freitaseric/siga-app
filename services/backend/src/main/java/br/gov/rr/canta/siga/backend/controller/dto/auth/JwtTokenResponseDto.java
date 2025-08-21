package br.gov.rr.canta.siga.backend.controller.dto.auth;

public record JwtTokenResponseDto(String accessToken, String refreshToken) {
}
