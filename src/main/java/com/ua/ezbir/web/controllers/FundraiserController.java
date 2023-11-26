package com.ua.ezbir.web.controllers;

import com.ua.ezbir.domain.Fundraiser;
import com.ua.ezbir.services.FundraiserService;
import com.ua.ezbir.web.fundraiser.FundraiserDto;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/fundraiser")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FundraiserController {
    private final FundraiserService fundraiserService;
    private final HttpSession session;

    @GetMapping("/search")
    public ResponseEntity<List<Fundraiser>> searchFundraisers(@RequestParam("keyword") String keyword) {
        return new ResponseEntity<>(fundraiserService.searchFundraisers(keyword), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addFundraiser(@RequestBody @Valid FundraiserDto fundraiserDto) {
        fundraiserService.addFundraiser(fundraiserDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/delete")
    public ResponseEntity<String> deleteFundraiser(@RequestParam("id") long id) {
        fundraiserService.deleteFundraiser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/get/redact")
    public ResponseEntity<?> getRedactFundraiser(@RequestParam("id") long id) {
        return new ResponseEntity<>(fundraiserService.getRedactFundraiser(id,session),HttpStatus.OK);
    }
    @PostMapping("/redact")
    public ResponseEntity<String> redactFundraiser(@RequestBody @Valid FundraiserDto fundraiserDto) {
        fundraiserService.redactFundraiser(fundraiserDto,session);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
