package com.ua.ezbir.domain.security.handler;

import com.ua.ezbir.domain.exceptions.BruteForceException;
import com.ua.ezbir.domain.security.BruteForce;
import com.ua.ezbir.repository.security.BruteForceRepository;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AbstractAuthenticationEvent;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuthenticationEventHandler {
    private static final int MAX_ATTEMPTS = 7;
    private final BruteForceRepository bruteForceRepository;

    public AuthenticationEventHandler(BruteForceRepository bruteForceRepository) {
        this.bruteForceRepository = bruteForceRepository;
    }

    @EventListener
    public void onSuccess(AuthenticationSuccessEvent success) {
        String ipAddress =getIp(success);
        System.out.println(ipAddress);
        Optional<BruteForce> bruteForceOptional=bruteForceRepository.findByIpAddress(ipAddress);
        if(bruteForceOptional.isPresent()){
            BruteForce bruteForce=bruteForceOptional.get();
            if(bruteForce.isLock()){
                throw new BruteForceException();
            }
            bruteForce.successAttempts();
            bruteForceRepository.save(bruteForce);
        }
        UserDetails details = (UserDetails) success.getAuthentication().getPrincipal();
    }
    @EventListener
    public void onFailure(AbstractAuthenticationFailureEvent failures) {
            String ipAddress =getIp(failures);
            System.out.println(ipAddress);
            BruteForce bruteForce;
            Optional<BruteForce> bruteForceOptional=bruteForceRepository.findByIpAddress(ipAddress);
            if(bruteForceOptional.isPresent()){
                bruteForce=bruteForceOptional.get();
                if(bruteForce.isLock()){
                    throw new BruteForceException();
                }
                bruteForce.addFailAttempts();
                if(bruteForce.getFailAttempts()>=MAX_ATTEMPTS){
                    bruteForce.setLock(true);
                }
                bruteForceRepository.save(bruteForce);

            }else {
                bruteForce=new BruteForce(ipAddress);
                bruteForce.addFailAttempts();
                bruteForceRepository.save(bruteForce);
            }
    }

    public static String getIp(AbstractAuthenticationEvent event) {
        Object details = event.getAuthentication().getDetails();
        if (details instanceof WebAuthenticationDetails) {
            return ((WebAuthenticationDetails) details).getRemoteAddress();
        }
        return null;
    }
}
