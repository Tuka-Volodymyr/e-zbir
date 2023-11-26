package com.ua.ezbir.web.user;

import com.ua.ezbir.domain.Fundraiser;

import java.util.List;

public record UserResponse(String username, String infoAboutYourself, byte[] bytePhoto, List<Fundraiser> fundraiserList) {
}
