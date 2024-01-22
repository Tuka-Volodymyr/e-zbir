package com.ua.ezbir.services;

import jakarta.servlet.http.HttpSession;

public interface MailService {
    void sendCodeToEmailForVerification(String email, HttpSession session);

    void sendCodeToEmailForChangePassword(String email, HttpSession session);
}
