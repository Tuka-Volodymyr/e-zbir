package com.ua.ezbir.services.impl;

import com.ua.ezbir.services.MailService;
import com.ua.ezbir.web.code.CodeDto;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    private final JavaMailSender javaMailSender;
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
}
