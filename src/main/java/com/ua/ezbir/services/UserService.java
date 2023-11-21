package com.ua.ezbir.services;

import com.ua.ezbir.domain.User;
import com.ua.ezbir.web.user.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    User getUserById(Long id);
    User getUser();
    void registerNewUser(UserDto userDto,HttpSession session);
    void sendCodeToEmail(String email, HttpServletRequest request);
    void checkCode(String code, HttpServletRequest request);
    void addPhoto(MultipartFile file) throws IOException;
    void addInfoAboutYourself(String data);
    void saveUser(User user);
}
