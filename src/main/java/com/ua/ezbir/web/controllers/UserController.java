package com.ua.ezbir.web.controllers;

import com.ua.ezbir.domain.User;
import com.ua.ezbir.services.MailService;
import com.ua.ezbir.services.UserService;
import com.ua.ezbir.web.user.LoginRequest;
import com.ua.ezbir.web.user.PasswordDto;
import com.ua.ezbir.web.user.UserDto;
import com.ua.ezbir.web.user.UserResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final MailService mailService;
    private final HttpSession session;

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@Valid @RequestBody LoginRequest request) {
        return new ResponseEntity<>(userService.login(request), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserDto userDto) {
        userService.registerNewUser(userDto, session);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam("keyword") String keyword) {
        return new ResponseEntity<>(userService.searchUsers(keyword), HttpStatus.OK);
    }

    @PostMapping("/send/code")
    public ResponseEntity<?> sendCodeForVerification(@RequestParam("email") String email) {
        mailService.sendCodeToEmailForVerification(email, session);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/check/code")
    public ResponseEntity<UserResponse> checkCodeForVerification(@RequestParam("code") String code) {
        return new ResponseEntity<>(userService.checkCodeVerification(code, session),HttpStatus.OK);
    }

    @PostMapping(path = "/add/photo",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addPhoto(@RequestParam("file") MultipartFile file) throws IOException {
        return new ResponseEntity<>(userService.addPhoto(file),HttpStatus.OK);
    }
    @PostMapping("/add/info")
    public ResponseEntity<?> addInfo(@RequestParam("info") String info) {
        userService.addInfoAboutYourself(info);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/change/password/send/code")
    public ResponseEntity<?> sendCodeForChangePassword(@RequestParam("email") String email) {
        mailService.sendCodeToEmailForChangePassword(email, session);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/change/password/check/code")
    public ResponseEntity<?> checkCodeForChangePassword(@RequestParam("code") String code) {
        userService.checkCodeForChangePassword(code, session);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/change/password")
    public ResponseEntity<?> changePassword(@RequestBody @Valid PasswordDto passwordDto){
        userService.changePassword(passwordDto,session);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/get")
    public ResponseEntity<UserResponse> getUser(@RequestParam("id") long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }
}
