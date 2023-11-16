package com.ua.ezbir.web.controllers;

import com.ua.ezbir.services.FundraiserService;
import com.ua.ezbir.web.dto.FundraiserDto;
import jakarta.servlet.http.HttpSession;
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
    @PostMapping("/delete")
    public ResponseEntity<String> deleteFundraiser(@RequestParam("id") long id) {
        fundraiserService.deleteFundraiser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/get/redact")
    public ResponseEntity<?> getRedactFundraiser(@RequestParam("id") long id, HttpSession session) {
        return new ResponseEntity<>(fundraiserService.getRedactFundraiser(id,session),HttpStatus.OK);
    }
    @PostMapping("/redact")
    public ResponseEntity<String> redactFundraiser(@RequestBody @Valid FundraiserDto fundraiserDto, HttpSession session) {
        fundraiserService.redactFundraiser(fundraiserDto,session);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
