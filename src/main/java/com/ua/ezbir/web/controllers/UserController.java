package com.ua.ezbir.web.controllers;

import com.ua.ezbir.services.UserService;
import com.ua.ezbir.services.impl.UserServiceImpl;
import com.ua.ezbir.web.user.UserDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private UserServiceImpl userServiceImpl;

    @Autowired
    public UserController(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserDto userDto) {
        userServiceImpl.registerNewUser(userDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
