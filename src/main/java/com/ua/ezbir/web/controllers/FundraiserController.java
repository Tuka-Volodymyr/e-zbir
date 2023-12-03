package com.ua.ezbir.web.controllers;

import com.ua.ezbir.domain.Fundraiser;
import com.ua.ezbir.services.FundraiserService;
import com.ua.ezbir.web.fundraiser.FundraiserDto;
import com.ua.ezbir.web.fundraiser.FundraiserResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/fundraiser")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FundraiserController {
    private final FundraiserService fundraiserService;
    private final HttpSession session;

    @GetMapping("/get/search")
    public ResponseEntity<List<FundraiserResponse>> searchFundraisers(@RequestParam("keyword") String keyword) {
        return new ResponseEntity<>(fundraiserService.searchFundraisers(keyword), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<List<FundraiserResponse>> addFundraiser(@RequestBody @Valid FundraiserDto fundraiserDto) {
        return new ResponseEntity<>(fundraiserService.addFundraiser(fundraiserDto),HttpStatus.OK);
    }
    @PostMapping("/delete")
    public ResponseEntity<List<FundraiserResponse>> deleteFundraiser(@RequestParam("id") long id) {
        return new ResponseEntity<>(fundraiserService.deleteFundraiser(id),HttpStatus.OK);
    }
    @GetMapping("/get/redact")
    public ResponseEntity<?> getRedactFundraiser(@RequestParam("id") long id) {
        return new ResponseEntity<>(fundraiserService.getRedactFundraiser(id,session),HttpStatus.OK);
    }
    @PostMapping("/redact")
    public ResponseEntity<List<FundraiserResponse>> redactFundraiser(@RequestBody @Valid FundraiserDto fundraiserDto) {
        return new ResponseEntity<>(fundraiserService.redactFundraiser(fundraiserDto,session),HttpStatus.OK);
    }
    @GetMapping("/get/all")
    public ResponseEntity<List<FundraiserResponse>> getAllFundraiser(){
        return new ResponseEntity<>(fundraiserService.getAllFundraiser(),HttpStatus.OK);
    }
    @GetMapping("/get")
    public ResponseEntity<FundraiserResponse> getFundraiserById(@RequestParam("id") long id){
        return new ResponseEntity<>(fundraiserService.getFundraiserById(id),HttpStatus.OK);
    }


}
