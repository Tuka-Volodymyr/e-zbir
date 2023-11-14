package com.ua.ezbir.services;

import com.ua.ezbir.web.user.UserDto;
import jakarta.servlet.http.HttpSession;

public interface UserService {
    void registerNewUser(UserDto userDto,HttpSession session);
    void sendCodeToEmail(String email, HttpSession session);
    void checkCode(String code,HttpSession session);
}
