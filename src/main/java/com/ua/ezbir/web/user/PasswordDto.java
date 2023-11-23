package com.ua.ezbir.web.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PasswordDto {
    @NotBlank(message = "Password should not be empty!")
    @Size(min = 4, max = 30, message = "Password should be between 4 and 30 characters")
    private String password;

    @NotBlank(message = "Password should not be empty!")
    @Size(min = 4, max = 30, message = "Password should be between 4 and 30 characters")
    private String repeatPassword;
}
