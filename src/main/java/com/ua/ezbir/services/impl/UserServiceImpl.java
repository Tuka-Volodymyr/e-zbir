package com.ua.ezbir.services.impl;

import com.ua.ezbir.domain.User;
import com.ua.ezbir.domain.exceptions.BadRequestException;
import com.ua.ezbir.repository.UserRepository;
import com.ua.ezbir.services.UserService;
import com.ua.ezbir.web.user.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void registerNewUser(UserDto userDto) {
        Optional<User> userExist=userRepository.findByEmail(userDto.getEmail());
        if(userExist.isPresent()){
            throw new BadRequestException("Email has already used");
        }
        User user=User.builder()
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .build();
        userRepository.save(user);
    }
}
