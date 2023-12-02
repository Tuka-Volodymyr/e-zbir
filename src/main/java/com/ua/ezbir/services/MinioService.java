package com.ua.ezbir.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public interface MinioService {
    void upload(MultipartFile file, String path);

    void createBucket();

    void saveFile(InputStream inputStream, String path);

    InputStream getFileContent(String path);
}
