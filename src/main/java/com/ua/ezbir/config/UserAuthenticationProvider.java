package com.ua.ezbir.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.json.JSONException;
import org.json.JSONObject;
import com.ua.ezbir.domain.User;
import com.ua.ezbir.domain.exceptions.UserNotFoundException;
import com.ua.ezbir.repository.UserRepository;
import com.ua.ezbir.services.UserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {
    private final UserRepository userRepository;

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;



//    @PostConstruct
//    protected void init() {
//        // this is to avoid having the raw secret key available in the JVM
//        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
//    }

    public String createToken(String login) {

        Date now = new Date();
        Date validity = new Date(now.getTime() + 360000000);

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withSubject(login)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(algorithm);
    }
    @Transactional
    public Authentication validateToken(String token) throws JSONException {
        String[] tokenParts = token.split("\\.");
        String payload = tokenParts[1];
        byte[] decodedPayload = Base64.getDecoder().decode(payload);
        String decodedPayloadString = new String(decodedPayload, StandardCharsets.UTF_8);
        JSONObject jsonObject = new JSONObject(decodedPayloadString);
        String email = jsonObject.getString("sub");
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(UserNotFoundException::new);
        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }

}