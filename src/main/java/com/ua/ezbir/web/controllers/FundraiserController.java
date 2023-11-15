package com.ua.ezbir.web.controllers;

import com.ua.ezbir.services.FundraiserService;
import com.ua.ezbir.web.dto.FundraiserDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/fundraiser")
public class FundraiserController {
    private final FundraiserService fundraiserService;

    @PostMapping("/add")
    public ResponseEntity<String> addFundraiser(@RequestBody @Valid FundraiserDto fundraiserDto) {
        fundraiserService.addFundraiser(fundraiserDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
