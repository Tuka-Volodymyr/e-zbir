package com.ua.ezbir.web.user;

import com.ua.ezbir.domain.Fundraiser;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record UserResponse(
        long userId,
        String username,
        String infoAboutYourself,
        MultipartFile bytePhoto,
        List<Fundraiser> fundraiserList,
        String token,
        long views
) {}
