package com.ua.ezbir.services.impl;

import com.ua.ezbir.domain.Fundraiser;
import com.ua.ezbir.domain.User;
import com.ua.ezbir.domain.exceptions.FundraiserNotFoundException;
import com.ua.ezbir.repository.FundraiserRepository;
import com.ua.ezbir.services.FundraiserService;
import com.ua.ezbir.services.UserService;
import com.ua.ezbir.web.fundraiser.FundraiserDto;
import com.ua.ezbir.web.fundraiser.FundraiserResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FundraiserServiceImpl implements FundraiserService {
    private final FundraiserRepository fundraiserRepository;
    private final UserService userService;
    public static final Sort sort = Sort.by(Sort.Direction.DESC, "currentDateTime");
    @Override
    public List<FundraiserResponse> addFundraiser(FundraiserDto fundraiserDto) {
        User user = userService.getUser();
        List<Fundraiser> fundraiserList = user.getFundraiserList();
        Fundraiser fundraiser = Fundraiser.builder()
                .user(user)
                .name(fundraiserDto.getName())
                .jarLink(fundraiserDto.getJarLink())
                .description(fundraiserDto.getDescription())
                .isClosed(false)
                .categories(fundraiserDto.getCategories())
                .currentDateTime(LocalDateTime.now())
                .suma(fundraiserDto.getSuma())
                .cards(fundraiserDto.getCards())
                .build();

        // save fundraiser in db
        fundraiserRepository.save(fundraiser);
        // add new fundraiser in user list
        fundraiserList.add(fundraiser);
        user.setFundraiserList(fundraiserList);
        // re-save user with updated fundraiser list
        userService.saveUser(user);
        return Fundraiser.toListOfFundraiserResponse(fundraiserList);
    }

    @Override
    public List<FundraiserResponse> deleteFundraiser(long id) {
        User user =userService.getUser();
        Fundraiser fundraiser=fundraiserRepository
                .findById(id)
                .orElseThrow(FundraiserNotFoundException::new);
        fundraiserRepository.delete(fundraiser);
        List<Fundraiser> fundraiserList= user.getFundraiserList();
        fundraiserList.remove(fundraiser);
        user.setFundraiserList(fundraiserList);
        userService.saveUser(user);
        return Fundraiser.toListOfFundraiserResponse(fundraiserList);
    }


    @Override
    public FundraiserDto getRedactFundraiser(long id, HttpSession session) {
        Fundraiser fundraiser= fundraiserRepository
                .findById(id)
                .orElseThrow(FundraiserNotFoundException::new);
        session.setAttribute("redactFundraiser",fundraiser);
        return fundraiser.toFundraiserDto();

    }
    @Override
    public List<FundraiserResponse> redactFundraiser(FundraiserDto redactedFundraiserDto, HttpSession session) {
        User user=userService.getUser();
        Fundraiser fundraiser=(Fundraiser) session.getAttribute("redactFundraiser");
        List<Fundraiser> fundraiserList= user.getFundraiserList();
        fundraiserList.remove(fundraiser);
        fundraiser.setDescription(redactedFundraiserDto.getDescription());
        fundraiser.setName(redactedFundraiserDto.getName());
        fundraiser.setJarLink(redactedFundraiserDto.getJarLink());
        fundraiser.setCategories(redactedFundraiserDto.getCategories());
        fundraiserRepository.save(fundraiser);
        fundraiserList.add(fundraiser);
        userService.saveUser(user);
        return Fundraiser.toListOfFundraiserResponse(fundraiserList);
    }

    @Override
    public List<FundraiserResponse> searchFundraisers(String keyword) {
        return Fundraiser.toListOfFundraiserResponse(fundraiserRepository.findByNameContainingIgnoreCase(keyword));
    }

    @Override
    public List<FundraiserResponse> getAllFundraiser() {
        return Fundraiser.toListOfFundraiserResponse(fundraiserRepository.findAll(sort));
    }
}
