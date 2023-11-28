package com.ua.ezbir.services;

import com.ua.ezbir.domain.Fundraiser;
import com.ua.ezbir.web.fundraiser.FundraiserDto;
import jakarta.servlet.http.HttpSession;

import java.util.List;

public interface FundraiserService {
    List<Fundraiser> addFundraiser(FundraiserDto fundraiserDto);
    void deleteFundraiser(long id);
    void redactFundraiser(FundraiserDto redactedFundraiserDto, HttpSession session);
    FundraiserDto getRedactFundraiser(long id, HttpSession session);

    List<Fundraiser> searchFundraisers(String keyword);
}
