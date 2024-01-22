package com.ua.ezbir.services;

import com.ua.ezbir.web.fundraiser.FundraiserDto;
import com.ua.ezbir.web.fundraiser.FundraiserResponse;
import jakarta.servlet.http.HttpSession;

import java.util.List;

public interface FundraiserService {
    List<FundraiserResponse> addFundraiser(FundraiserDto fundraiserDto);
    List<FundraiserResponse> deleteFundraiser(long id);
    List<FundraiserResponse> redactFundraiser(FundraiserDto redactedFundraiserDto, HttpSession session);
    FundraiserDto getRedactFundraiser(long id, HttpSession session);

    List<FundraiserResponse> searchFundraisers(String keyword);
    List<FundraiserResponse> getAllFundraiser();

    FundraiserResponse getFundraiserById(long id);
}
