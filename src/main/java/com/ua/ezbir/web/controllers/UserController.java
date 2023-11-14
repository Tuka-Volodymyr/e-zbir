package com.ua.ezbir.web.controllers;

import com.ua.ezbir.services.impl.UserServiceImpl;
import com.ua.ezbir.web.user.UserDto;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    private UserServiceImpl userServiceImpl;

    @Autowired
    public UserController(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserDto userDto,HttpSession session) {
        userServiceImpl.registerNewUser(userDto,session);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/send/code")
    public ResponseEntity<String> sendCode(@RequestParam("email") String email,HttpSession session) {
        userServiceImpl.sendCodeToEmail(email,session);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/check/code")
    public ResponseEntity<String> checkCode(@RequestParam("code") String code, HttpSession session) {
        userServiceImpl.checkCode(code,session);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping(path = "/user/add/photo",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addPhoto(@RequestParam(value = "photo") MultipartFile file) throws IOException {
        userServiceImpl.addPhoto(file);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
