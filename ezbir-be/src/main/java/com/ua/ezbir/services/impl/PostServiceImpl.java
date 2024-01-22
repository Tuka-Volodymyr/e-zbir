package com.ua.ezbir.services.impl;

import com.ua.ezbir.domain.Fundraiser;
import com.ua.ezbir.domain.Post;
import com.ua.ezbir.domain.exceptions.FundraiserNotFoundException;
import com.ua.ezbir.repository.FundraiserRepository;
import com.ua.ezbir.repository.PostRepository;
import com.ua.ezbir.services.PostService;
import com.ua.ezbir.web.fundraiser.PostDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final FundraiserRepository fundraiserRepository;

    @Override
    public void addPost(PostDto postDto, long fundraiserId) throws IOException {
        List<byte[]> photos=new ArrayList<>();
        for(MultipartFile photo: postDto.getPhotos()){
            photos.add(photo.getBytes());
        }
        Fundraiser fundraiser=fundraiserRepository
                .findById(fundraiserId)
                .orElseThrow(FundraiserNotFoundException::new);
        Post post=Post.builder()
                .fundraiser(fundraiser)
                .text(postDto.getText())
                .currentDateTime(LocalDateTime.now())
                .listPhoto(photos)
                .build();
        postRepository.save(post);
    }
}
