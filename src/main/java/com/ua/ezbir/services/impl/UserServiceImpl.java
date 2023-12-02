package com.ua.ezbir.services.impl;

import com.ua.ezbir.config.UserAuthenticationProvider;
import com.ua.ezbir.domain.User;
import com.ua.ezbir.domain.exceptions.BadRequestException;
import com.ua.ezbir.domain.exceptions.UnauthorizedException;
import com.ua.ezbir.domain.exceptions.UserNotFoundException;
import com.ua.ezbir.repository.UserRepository;
import com.ua.ezbir.services.UserService;
import com.ua.ezbir.web.user.LoginRequest;
import com.ua.ezbir.web.user.PasswordDto;
import com.ua.ezbir.web.user.UserDto;
import com.ua.ezbir.web.user.UserResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserAuthenticationProvider userAuthenticationProvider;


    @Override
    public UserResponse login(LoginRequest request) {
        Optional<User> userOptional = validUsernameAndPassword(request.getEmail(), request.getPassword());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println(user.getUsername());
            return User.userToUserResponseWithToken(user,userAuthenticationProvider.createToken(user.getEmail()));
        } else {
            throw new UnauthorizedException();
        }
    }

    @Override
    public Optional<User> validUsernameAndPassword(String username, String password) {
        return getUserByEmail(username)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()));
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user= userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        user.setViews(user.getViews()+1);
        saveUser(user);
        return User.userToUserResponseWithToken(user,null);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        return userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(UserNotFoundException::new);
    }

    @Override
    public void saveUser(User user) {
        if (user != null) {
            userRepository.save(user);
        } else {
            throw new NullPointerException();
        }
    }

    @Override
    public void passwordsIsEquals(String password,String repeatPassword) {
        if (!password.equals(repeatPassword)) {
            throw new BadRequestException("Password doesn't match");
        }
    }

    @Override
    public void codesIsEquals(String code,String inputCode){
        if (!code.equals(inputCode))
            throw new BadRequestException("Code is wrong");
    }

    @Override
    public void registerNewUser(UserDto userDto, HttpSession session) {
        Optional<User> userExist = userRepository.findByEmail(userDto.getEmail());
        passwordsIsEquals(userDto.getPassword(),userDto.getRepeatPassword());
        if(userExist.isPresent()) {
            throw new BadRequestException("Email has already used");
        }

        User user = User.builder()
                .fullName(userDto.getUsername())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .fundraiserList(new LinkedList<>())
                .currentDateTime(LocalDateTime.now())
                .build();
        session.setAttribute("user",user);
    }





    @Override
    public UserResponse checkCodeVerification(String userCode, HttpSession session) {
        String code = (String) session.getAttribute("codeVerification");
        codesIsEquals(code,userCode);
        User user = (User) session.getAttribute("user");
        saveUser(user); // save user in db
        return User.userToUserResponseWithToken(user,userAuthenticationProvider.createToken(user.getEmail()));
    }

    @Override
    public UserResponse addPhoto(MultipartFile file) throws IOException {
        if (file.isEmpty())
            throw new BadRequestException("File is empty");
        byte[] photoBytes = file.getBytes();
        User user=getUser();
        user.setBytePhoto(photoBytes);
        saveUser(user);
        return User.userToUserResponseWithToken(user,null);

    }

    @Override
    public void addInfoAboutYourself(String data) {
        User user=getUser();
        user.setInfoAboutYourself(data);
        saveUser(user);
    }

    @Override
    public void checkCodeForChangePassword(String userCode, HttpSession session) {
        String code = (String) session.getAttribute("codeChangePassword");
        codesIsEquals(code,userCode);
    }


    @Override
    public void changePassword(PasswordDto passwordDto,HttpSession session) {
        passwordsIsEquals(passwordDto.getPassword(), passwordDto.getRepeatPassword());
        String email = (String) session.getAttribute("userEmailChangePassword");
        User user = getUserByEmail(email).orElseThrow(UserNotFoundException::new);
        user.setPassword(passwordEncoder.encode(passwordDto.getPassword()));
        saveUser(user);
    }

    @Override
    public List<User> searchUsers(String keyword) {
        return userRepository.findByUsernameContainingIgnoreCase(keyword);
    }
}
