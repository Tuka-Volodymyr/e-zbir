package com.ua.ezbir.web.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FundraiserDto {
    @NotBlank(message = "Name should not be empty!")
    private String name;

    @NotBlank(message = "Jar link should not be empty!")
    private String jarLink;

    @NotBlank(message = "Description should not be empty!")
    private String description;
}
