package com.ua.ezbir.web.fundraiser;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FundraiserDto {
    @NotBlank(message = "Name should not be empty!")
    private String name;

//    @NotBlank(message = "Jar link should not be empty!")
    private String jarLink;

    private float suma;

    @NotBlank(message = "Description should not be empty!")
    @Size(min = 20,max = 1000)
    private String description;

//    @NotBlank(message = "Categories should not be empty!")
    private List<String> categories;
    private List<String> cards;
}
