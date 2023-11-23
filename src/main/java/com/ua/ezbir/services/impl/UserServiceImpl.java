package com.ua.ezbir.services.impl;

import com.ua.ezbir.domain.User;
import com.ua.ezbir.domain.exceptions.BadRequestException;
import com.ua.ezbir.domain.exceptions.UserNotFoundException;
import com.ua.ezbir.repository.UserRepository;
import com.ua.ezbir.services.UserService;
import com.ua.ezbir.web.code.CodeDto;
import com.ua.ezbir.web.user.PasswordDto;
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
import java.time.LocalDateTime;
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

    public User getUserByEmail(String email){return userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);}


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
    public void registerNewUser(UserDto userDto,HttpSession session) {
        Optional<User> userExist = userRepository.findByEmail(userDto.getEmail());
        passwordsIsEquals(userDto.getPassword(),userDto.getRepeatPassword());
        if(userExist.isPresent()){
            throw new BadRequestException("Email has already used");
        }

        User user = User.builder()
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .fundraiserList(new LinkedList<>())
                .currentDateTime(LocalDateTime.now())
                .build();
        session.setAttribute("user",user);
    }
    @Override
    public void sendCodeToEmailForVerification(String email, HttpSession session) {
        CodeDto codeDto = new CodeDto(); // auto-generated code

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[Є-Збір] Будь ласка, підтвердіть вашу електронну адресу");
        message.setText("""
                Дякуємо за регістрацію на Є-Збір! Код для підтвердження:\s
                """ + codeDto.getCode());
        javaMailSender.send(message);

        session.setAttribute("codeVerification", codeDto.getCode());
    }



    @Override
    public void checkCodeVerification(String userCode, HttpSession session) {
        String code = (String) session.getAttribute("codeVerification");
        codesIsEquals(code,userCode);
        if(session.getAttribute("user")!=null){
            User user = (User) session.getAttribute("user");
            saveUser(user); // save user in db
        }
    }

    @Override
    public void addPhoto(MultipartFile file) throws IOException {
        if (file.isEmpty())
            throw new BadRequestException("File is empty");
        byte[] photoBytes = file.getBytes();
        User user=getUser();
        user.setBytePhoto(photoBytes);
        saveUser(user);
    }
    @Override
    public void addInfoAboutYourself(String data) {
        User user=getUser();
        user.setInfoAboutYourself(data);
        saveUser(user);
    }
    @Override
    public void sendCodeToEmailForChangePassword(String email, HttpSession session) {
        CodeDto codeDto = new CodeDto(); // auto-generated code

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[Є-Збір] Будь ласка, підтвердіть вашу електронну адресу");
        message.setText("""
                Код для зміни паролю:\s
                """ + codeDto.getCode());
        javaMailSender.send(message);
        session.setAttribute("userEmailChangePassword",email);
        session.setAttribute("codeChangePassword", codeDto.getCode());
    }

    @Override
    public void checkCodeForChangePassword(String userCode, HttpSession session) {
        String code = (String) session.getAttribute("codeChangePassword");
        codesIsEquals(code,userCode);
    }


    @Override
    public void changePassword(PasswordDto passwordDto,HttpSession session) {
        passwordsIsEquals(passwordDto.getPassword(), passwordDto.getRepeatPassword());
        String email=(String) session.getAttribute("userEmailChangePassword");
        User user =getUserByEmail(email);
        user.setPassword(passwordEncoder.encode(passwordDto.getPassword()));
        saveUser(user);
    }
}
