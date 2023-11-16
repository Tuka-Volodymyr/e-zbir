package com.ua.ezbir.domain.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Fundraiser not found!")
public class FundraiserNotFoundException extends RuntimeException{
}
