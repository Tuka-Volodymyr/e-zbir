package com.ua.ezbir.web.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    @NotBlank(message = "Username should not be empty!")
    @Size(min = 5, max = 30, message = "Username should be between 5 and 30 characters")
    private String username;
    @NotBlank(message = "Email should not be empty!")
    @Email
    @Size(min = 5, max = 30, message = "Email should be between 5 and 30 characters")
    private String email;

    @NotBlank(message = "Password should not be empty!")
    @Size(min = 4, max = 30, message = "Password should be between 4 and 30 characters")
    private String password;

    @NotBlank(message = "Password should not be empty!")
    @Size(min = 4, max = 30, message = "Password should be between 4 and 30 characters")
    private String repeatPassword;
}
