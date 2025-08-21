package br.gov.rr.canta.siga.backend.controller.dto.user;

import br.gov.rr.canta.siga.backend.model.user.AccessRole;
import br.gov.rr.canta.siga.backend.model.user.User;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Builder
public record UserResponseDto(
        UUID id,
        String name,
        String email,
        String cpf,
        String role,
        Set<AccessRole> accessRoles,
        String photoUrl,
        LocalDateTime createdAt
) {
    public static UserResponseDto fromModel(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .cpf(user.getCpf())
                .role(user.getRole())
                .accessRoles(user.getAccessRoles())
                .photoUrl(user.getPhotoUrl())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
