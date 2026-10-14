package com.moneycoach.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;

public record CoachRequest(
        @NotBlank @Size(max = 500) String message,
        @Pattern(regexp = "^[A-Za-z]{2,3}$") String language,
        @Valid @Size(max = 6) List<Turn> history) {

    public record Turn(
            @NotBlank @Pattern(regexp = "user|assistant") String role,
            @NotBlank @Size(max = 500) String content) {
    }
}
