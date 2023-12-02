package com.ua.ezbir.services;

import com.ua.ezbir.domain.User;
import com.ua.ezbir.web.user.LoginRequest;
import com.ua.ezbir.web.user.PasswordDto;
import com.ua.ezbir.web.user.UserDto;
import com.ua.ezbir.web.user.UserResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface UserService {
    UserResponse login(LoginRequest loginRequest);

    Optional<User> getUserByEmail(String email);

    Optional<User> validUsernameAndPassword(String username, String password);

    UserResponse getUserById(Long id);

    User getUser();

    List<User> searchUsers(String keyword);

    void codesIsEquals(String code, String inputCode);

    void registerNewUser(UserDto userDto, HttpSession session);

    void passwordsIsEquals(String password, String repeatPassword);


    void checkCodeForChangePassword(String userCode, HttpSession session);

    void changePassword(PasswordDto passwordDto,HttpSession session);

    UserResponse checkCodeVerification(String code, HttpSession session);

    MultipartFile addPhoto(MultipartFile file) throws IOException;

    void addInfoAboutYourself(String data);

    void saveUser(User user);
    UserResponse userToUserResponseWithToken(User user, String token);
}
