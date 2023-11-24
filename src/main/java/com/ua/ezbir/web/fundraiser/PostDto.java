package com.ua.ezbir.web.fundraiser;

import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class PostDto {
    @Size(min = 10, max = 300, message = "Text should be between 10 and 300 characters")
    private String text;
    @Size(min = 1000,max = 100000000,message = "It must be photos or videos")
    private List<MultipartFile> photos;
}
