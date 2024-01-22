package com.ua.ezbir.web.controllers;

import com.ua.ezbir.services.PostService;
import com.ua.ezbir.web.fundraiser.PostDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/post")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PostController {
    private final PostService postService;

    @PostMapping("/add")
    public ResponseEntity<?> addPost(
            @RequestBody @Valid PostDto postDto,
            @RequestParam("fundraiserId") long fundraiserId
    ) throws IOException {
        postService.addPost(postDto,fundraiserId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
