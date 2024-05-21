package com.ua.ezbir.web.user;

import com.ua.ezbir.domain.Fundraiser;

import java.util.List;

public record UserResponseWithoutToken(
        long userId,
        String username,
        String infoAboutYourself,
        String photoUrl,
        List<Fundraiser> fundraiserList,
        long views
) {}
