package com.ua.ezbir.services;

import com.ua.ezbir.domain.User;
import com.ua.ezbir.web.user.PasswordDto;
import com.ua.ezbir.web.user.UserDto;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    User getUserById(Long id);
    User getUser();

    void codesIsEquals(String code, String inputCode);

    void registerNewUser(UserDto userDto, HttpSession session);

    void passwordsIsEquals(String password, String repeatPassword);

    void sendCodeToEmailForVerification(String email, HttpSession session);
    void sendCodeToEmailForChangePassword(String email, HttpSession session);

    void checkCodeForChangePassword(String userCode, HttpSession session);

    void changePassword(PasswordDto passwordDto,HttpSession session);

    void checkCodeVerification(String code, HttpSession session);
    void addPhoto(MultipartFile file) throws IOException;
    void addInfoAboutYourself(String data);
    void saveUser(User user);
}
