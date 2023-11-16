package com.ua.ezbir.services.impl;

import com.ua.ezbir.domain.User;
import com.ua.ezbir.domain.exceptions.BadRequestException;
import com.ua.ezbir.domain.exceptions.UserNotFoundException;
import com.ua.ezbir.repository.UserRepository;
import com.ua.ezbir.services.UserService;
import com.ua.ezbir.web.dto.CodeDto;
import com.ua.ezbir.web.user.UserDto;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.LinkedList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final JavaMailSender javaMailSender;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
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
    public void registerNewUser(UserDto userDto,HttpSession session) {
        Optional<User> userExist = userRepository.findByEmail(userDto.getEmail());
        if(!userDto.getPassword().equals(userDto.getRepeatPassword())){
            throw new BadRequestException("Password don`t match");
        }else if(userExist.isPresent()){
            throw new BadRequestException("Email has already used");
        }
        User user=User.builder()
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .fundraiserList(new LinkedList<>())
                .build();
        session.setAttribute("user",user);
    }

    @Override
    public void sendCodeToEmail(String email, HttpSession session) {
        CodeDto code=new CodeDto();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset");
        message.setText("Code: "+code.getCode());
        session.setAttribute("code",code.getCode());
        javaMailSender.send(message);
    }

    @Override
    public void checkCode(String code,HttpSession session) {
        String correctCode= (String) session.getAttribute("code");
        if(!code.equals(correctCode)){
            throw new BadRequestException("Code is wrong");
        }
        User user=(User) session.getAttribute("user");
        userRepository.save(user);
    }

    @Override
    public void addPhoto(MultipartFile file) throws IOException {
        if (file.isEmpty())
            throw new BadRequestException("File is empty");
        byte[] photoBytes = file.getBytes();
        User user=getUser();
        user.setBytePhoto(photoBytes);
        userRepository.save(user);
    }

    @Override
    public void addInfoAboutYourself(String data) {
        User user=getUser();
        user.setInfoAboutYourself(data);
    }
}
