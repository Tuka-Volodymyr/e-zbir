package com.ua.ezbir.web.dto;

import lombok.Data;

import java.util.Random;

@Data
public class CodeDto {
    private String code;

    public CodeDto() {
        code = generateCod();
    }

    public String generateCod() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            code.append(randomChar);
        }
        return code.toString();
    }
}
