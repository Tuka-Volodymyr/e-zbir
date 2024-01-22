package com.ua.ezbir.domain.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED,reason = "Account is lock!!!")
public class BruteForceException extends RuntimeException{
}
