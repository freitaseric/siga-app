package br.gov.rr.canta.siga.backend.controller;

import br.gov.rr.canta.siga.backend.controller.dto.auth.JwtTokenResponseDto;
import br.gov.rr.canta.siga.backend.controller.dto.auth.LoginRequestDto;
import br.gov.rr.canta.siga.backend.controller.dto.auth.LogoutRequestDto;
import br.gov.rr.canta.siga.backend.controller.dto.auth.RefreshTokenRequestDto;
import br.gov.rr.canta.siga.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtTokenResponseDto> authenticateUser(@RequestBody LoginRequestDto loginRequestDto) {
        JwtTokenResponseDto token = authService.authenticate(loginRequestDto);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtTokenResponseDto> refreshUser(@RequestBody RefreshTokenRequestDto refreshTokenRequestDto) {
        try {
            JwtTokenResponseDto newTokens = authService.refreshToken(refreshTokenRequestDto.refreshToken());
            return new ResponseEntity<>(newTokens, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody LogoutRequestDto logoutRequestDto) {
        try {
            authService.logout(logoutRequestDto.accessToken(), logoutRequestDto.refreshToken());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}
