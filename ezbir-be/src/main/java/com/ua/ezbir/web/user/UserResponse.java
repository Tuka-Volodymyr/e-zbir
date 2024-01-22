package com.ua.ezbir.web.user;

import com.ua.ezbir.domain.Fundraiser;

import java.util.List;

public record UserResponse(
        long userId,
        String username,
        String infoAboutYourself,
        String photoUrl,
        List<Fundraiser> fundraiserList,
        String token,
        long views
) {}
