package com.ua.ezbir.web.controllers;

import com.ua.ezbir.services.UserService;
import com.ua.ezbir.web.user.UserDto;
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
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    private final UserService userService;
    private final HttpSession session;

    @GetMapping("/user")
    public ResponseEntity<?> getUser(@RequestParam("id") Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserDto userDto) {
        userService.registerNewUser(userDto, session);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/send/code")
    public ResponseEntity<?> sendCode(@RequestParam("email") String email) {
        userService.sendCodeToEmail(email, session);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/check/code")
    public ResponseEntity<?> checkCode(@RequestParam("code") String code) {
        userService.checkCode(code, session);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path = "/user/add/photo",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addPhoto(@RequestParam(value = "photo") MultipartFile file) throws IOException {
        userService.addPhoto(file);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
