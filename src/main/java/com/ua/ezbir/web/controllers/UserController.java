package com.ua.ezbir.web.controllers;

import com.ua.ezbir.services.UserService;
import com.ua.ezbir.web.user.UserDto;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserDto userDto,HttpSession session) {
        userService.registerNewUser(userDto,session);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/send/code")
    public ResponseEntity<String> sendCode(@RequestParam("email") String email,HttpSession session) {
        userService.sendCodeToEmail(email,session);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/check/code")
    public ResponseEntity<String> checkCode(@RequestParam("code") String code, HttpSession session) {
        userService.checkCode(code,session);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path = "/user/add/photo",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addPhoto(@RequestParam(value = "photo") MultipartFile file) throws IOException {
        userService.addPhoto(file);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
