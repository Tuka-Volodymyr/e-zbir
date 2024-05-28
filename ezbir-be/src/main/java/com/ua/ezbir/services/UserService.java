package com.ua.ezbir.services;

import com.ua.ezbir.domain.User;
import com.ua.ezbir.web.user.*;
import jakarta.servlet.http.HttpSession;

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

    // TODO: impl photos by aws s3
    // String addPhoto(MultipartFile file) throws IOException;

    void addInfoAboutYourself(String data);

    void saveUser(User user);

    List<UserResponseWithoutToken> getAll();
}
