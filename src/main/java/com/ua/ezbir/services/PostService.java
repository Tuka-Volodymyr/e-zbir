package com.ua.ezbir.services;

import com.ua.ezbir.web.fundraiser.FundraiserDto;
import com.ua.ezbir.web.fundraiser.PostDto;

import java.io.IOException;

public interface PostService {
    void addPost(PostDto postDto, long fundraiserId) throws IOException;
}
