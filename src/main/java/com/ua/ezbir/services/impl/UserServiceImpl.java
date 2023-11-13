package com.ua.ezbir.services.impl;

import com.ua.ezbir.domain.User;
import com.ua.ezbir.domain.exceptions.BadRequestException;
import com.ua.ezbir.repository.UserRepository;
import com.ua.ezbir.services.UserService;
import com.ua.ezbir.web.code.CodeDto;
import com.ua.ezbir.web.user.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final JavaMailSender javaMailSender;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JavaMailSender javaMailSender) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void registerNewUser(UserDto userDto) {
        Optional<User> userExist = userRepository.findByEmail(userDto.getEmail());
        if(!userDto.getPassword().equals(userDto.getRepeatPassword())){
            throw new BadRequestException("Password don`t match");
        }else if(userExist.isPresent()){
            throw new BadRequestException("Email has already used");
        }
        User user=User.builder()
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .build();
//        Save after correct code
//        userRepository.save(user);
    }

    @Override
    public void sendCodeToEmail(String email) {
        CodeDto code=new CodeDto();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset");
        message.setText("Code: "+code.getCode());
        javaMailSender.send(message);
    }
}
