package com.ua.ezbir.web.fundraiser;

import com.ua.ezbir.domain.Post;
import com.ua.ezbir.domain.User;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import java.time.LocalDateTime;
import java.util.List;

public record FundraiserResponse(
        long userId,
        String username,
         Long fundraiserId,
         float suma,
         String name,
         String jarLink,
         String description,
         LocalDateTime currentDateTime,
         List<String> categories,
         List<String> cards,
         boolean isClosed
) {
}
