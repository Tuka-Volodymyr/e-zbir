package com.ua.ezbir.web.user;

import com.ua.ezbir.domain.Fundraiser;

import java.util.List;

public record UserResponse(
        String username,
        String infoAboutYourself,
        String bytePhoto,
        List<Fundraiser> fundraiserList
) {}
