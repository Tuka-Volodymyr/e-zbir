package com.ua.ezbir.services.impl;

import com.ua.ezbir.domain.Fundraiser;
import com.ua.ezbir.domain.User;
import com.ua.ezbir.repository.FundraiserRepository;
import com.ua.ezbir.services.FundraiserService;
import com.ua.ezbir.services.UserService;
import com.ua.ezbir.web.dto.FundraiserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FundraiserServiceImpl implements FundraiserService {
    private final FundraiserRepository fundraiserRepository;
    private final UserService userService;

    @Override
    public void addFundraiser(FundraiserDto fundraiserDto) {
        User user = userService.getUser();
        List<Fundraiser> fundraiserList = user.getFundraiserList();

        Fundraiser fundraiser = Fundraiser.builder()
                .user(user)
                .name(fundraiserDto.getName())
                .jarLink(fundraiserDto.getJarLink())
                .description(fundraiserDto.getDescription())
                .isClosed(false)
                .build();

        // save fundraiser in db
        fundraiserRepository.save(fundraiser);
        // add new fundraiser in user list
        fundraiserList.add(fundraiser);
        user.setFundraiserList(fundraiserList);
        // re-save user with updated fundraiser list
        userService.saveUser(user);
    }
}
