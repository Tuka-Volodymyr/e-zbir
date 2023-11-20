package com.ua.ezbir.services;

import com.ua.ezbir.web.fundraiser.FundraiserDto;
import jakarta.servlet.http.HttpSession;

public interface FundraiserService {
    void addFundraiser(FundraiserDto fundraiserDto);
    void deleteFundraiser(long id);
    void redactFundraiser(FundraiserDto redactedFundraiserDto, HttpSession session);
    FundraiserDto getRedactFundraiser(long id, HttpSession session);

}
