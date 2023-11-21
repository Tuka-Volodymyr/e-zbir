package com.ua.ezbir.web.controllers;

import com.ua.ezbir.domain.User;
import com.ua.ezbir.services.UserService;
import com.ua.ezbir.web.user.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("/user")
    public ResponseEntity<?> getUser(@RequestParam("id") Long id) {
        User user = userService.getUserById(id);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserDto userDto,HttpSession session) {
        userService.registerNewUser(userDto,session);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/send/code")
    public ResponseEntity<String> sendCode(@RequestParam("email") String email, HttpServletRequest request) {
        userService.sendCodeToEmail(email, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/check/code")
    public ResponseEntity<String> checkCode(@RequestParam("code") String code, HttpServletRequest request) {
        userService.checkCode(code, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path = "/user/add/photo",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addPhoto(@RequestParam(value = "photo") MultipartFile file) throws IOException {
        userService.addPhoto(file);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
