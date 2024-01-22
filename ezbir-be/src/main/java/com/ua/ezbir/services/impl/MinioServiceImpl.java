package com.ua.ezbir.services.impl;

import com.ua.ezbir.domain.exceptions.MinioException;
import com.ua.ezbir.properties.MinioProperties;
import com.ua.ezbir.services.MinioService;
import io.minio.*;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class MinioServiceImpl implements MinioService {
    private final MinioClient minioClient;
    private final MinioProperties minioProperties;

    @Override
    @Transactional
    public String upload(MultipartFile file, String path) {
        try {
            createBucket(); // create bucket in minio
        } catch (Exception e) {
            throw new MinioException("File upload failed");
        }
        if (file.isEmpty() || file.getOriginalFilename() == null) {
            throw new MinioException("File must have name");
        }

        InputStream inputStream;
        try {
            inputStream = file.getInputStream();
        } catch (Exception e) {
            throw new MinioException("File upload failed");
        }
        saveFile(inputStream, path);
        return minioProperties.getUrl() + "/" + minioProperties.getBucket() + path;
    }

    @Override
    @SneakyThrows
    public void createBucket() {
        boolean found = minioClient.bucketExists(BucketExistsArgs.builder()
                .bucket(minioProperties.getBucket())
                .build());
        if (!found) {
            minioClient.makeBucket(MakeBucketArgs.builder()
                    .bucket(minioProperties.getBucket())
                    .build());
        }
    }

    @Override
    @SneakyThrows
    public void saveFile(InputStream inputStream, String path) {
        minioClient.putObject(PutObjectArgs.builder()
                .stream(inputStream, inputStream.available(), -1)
                .bucket(minioProperties.getBucket())
                .object(path)
                .build());
    }

    @Override
    @SneakyThrows
    public InputStream getFileContent(String path) {
        return minioClient.getObject(GetObjectArgs.builder()
                .bucket(minioProperties.getBucket())
                .object(path)
                .build());
    }
}
