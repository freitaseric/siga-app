package br.gov.rr.canta.siga.backend.service;

import br.gov.rr.canta.siga.backend.controller.dto.auth.JwtTokenResponseDto;
import br.gov.rr.canta.siga.backend.controller.dto.auth.LoginRequestDto;
import br.gov.rr.canta.siga.backend.model.user.User;
import br.gov.rr.canta.siga.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenBlacklistService tokenBlacklistService;

    public JwtTokenResponseDto authenticate(LoginRequestDto dto) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(dto.email(), dto.password());

        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        User user = (User) authentication.getPrincipal();

        return new JwtTokenResponseDto(
                jwtService.generateToken(user),
                jwtService.generateRefreshToken(user)
        );
    }

    public JwtTokenResponseDto refreshToken(String refreshToken) {
        if (!jwtService.isRefreshTokenValid(refreshToken)) {
            throw new RuntimeException("Invalid or expired refresh token");
        }

        if (tokenBlacklistService.isTokenBlacklisted(refreshToken)) {
            throw new RuntimeException("Refresh token has been revoked");
        }

        String userEmail = jwtService.getSubjectFromRefreshToken(refreshToken);

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String newAccessToken = jwtService.generateToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);

        return new JwtTokenResponseDto(newAccessToken, newRefreshToken);
    }

    public void logout(String accessToken, String refreshToken) {
        try {
            if (jwtService.isTokenValid(accessToken)) {
                long accessTokenExpiration = jwtService.getTokenExpirationTime(accessToken);
                tokenBlacklistService.blacklistToken(accessToken, accessTokenExpiration);
            }

            if (jwtService.isTokenValid(refreshToken)) {
                long refreshTokenExpiration = jwtService.getTokenExpirationTime(refreshToken);
                tokenBlacklistService.blacklistToken(refreshToken, refreshTokenExpiration);
            }
        } catch (Exception e) {
            System.err.println("Error during logout: " + e.getMessage());
        }
    }
}
