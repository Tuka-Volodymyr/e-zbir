package com.ua.ezbir.domain.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class MinioException extends RuntimeException {
    public MinioException(String message) {
        super(message);
    }
}
