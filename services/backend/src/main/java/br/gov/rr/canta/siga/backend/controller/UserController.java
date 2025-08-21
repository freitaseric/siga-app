package br.gov.rr.canta.siga.backend.controller;

import br.gov.rr.canta.siga.backend.controller.dto.user.CreateUserRequestDto;
import br.gov.rr.canta.siga.backend.controller.dto.user.UpdateUserRequestDto;
import br.gov.rr.canta.siga.backend.controller.dto.user.UserResponseDto;
import br.gov.rr.canta.siga.backend.model.user.User;
import br.gov.rr.canta.siga.backend.repository.UserRepository;
import br.gov.rr.canta.siga.backend.repository.specification.UserSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/v1/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Page<UserResponseDto>> getAllUsers(Pageable pageable) {
        return new ResponseEntity<>(userRepository.findAll(pageable).map(UserResponseDto::fromModel), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable String id) {
        User user = userRepository.findById(UUID.fromString(id)).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return new ResponseEntity<>(UserResponseDto.fromModel(user), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<UserResponseDto>> searchUser(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String cpf,
            Pageable pageable
    ) {
        Specification<User> spec = Specification.anyOf();

        if (name != null) {
            spec = spec.and(UserSpecification.nameLike(name));
        }
        if (email != null) {
            spec = spec.and(UserSpecification.emailEquals(email));
        }
        if (cpf != null) {
            spec = spec.and(UserSpecification.cpfEquals(cpf));
        }

        Page<User> userPage = userRepository.findAll(spec, pageable);

        Page<UserResponseDto> responseDtoPage = userPage.map(UserResponseDto::fromModel);

        return new ResponseEntity<>(responseDtoPage, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody CreateUserRequestDto createUserRequestDto) {
        User user = userRepository.save(createUserRequestDto.toModel());
        return new ResponseEntity<>(UserResponseDto.fromModel(user), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(
            @PathVariable String id,
            @RequestBody UpdateUserRequestDto updateUserRequestDto
    ) {
        return userRepository.findById(UUID.fromString(id))
                .map(existingUser -> {
                    updateUserRequestDto.name().ifPresent(existingUser::setName);
                    updateUserRequestDto.email().ifPresent(existingUser::setEmail);
                    updateUserRequestDto.cpf().ifPresent(existingUser::setCpf);
                    updateUserRequestDto.role().ifPresent(existingUser::setRole);
                    updateUserRequestDto.photoUrl().ifPresent(existingUser::setPhotoUrl);
                    updateUserRequestDto.bankDetails().ifPresent(existingUser::setBankDetails);

                    User updatedUser = userRepository.save(existingUser);

                    return new ResponseEntity<>(UserResponseDto.fromModel(updatedUser), HttpStatus.OK);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable String id) {
        return userRepository.findById(UUID.fromString(id))
                .map(userToDelete -> {
                    userToDelete.setDeleted(true);

                    userRepository.save(userToDelete);

                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
