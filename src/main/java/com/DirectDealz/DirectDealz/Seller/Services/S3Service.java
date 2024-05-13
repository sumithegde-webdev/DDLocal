package com.DirectDealz.DirectDealz.Seller.Services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;


@Service
public class S3Service {
    
   
    public final static Region region = Region.AP_SOUTH_1;
    public final static S3Client s3Client;
    static {
        s3Client = S3Client.builder()
                .region(region)
                .credentialsProvider(() -> AwsBasicCredentials.create(System.getenv("AWS_ACCESS_KEY_ID"),
                        System.getenv("AWS_SECRET_ACCESS_KEY")))
                .build();
    }
    public final static String bucketName = System.getenv("BUCKET_NAME");


    public String uploadFileToS3(MultipartFile file, String key) throws IOException {
        File tempFile = convertMultiPartFileToFile(file);
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    // .acl(ObjectCannedACL.PUBLIC_READ)
                    .build();

            PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromFile(tempFile));

            
            return response.toString();
        } catch (SdkException e) {
            // Handle S3 client exceptions
            throw new IOException("Error uploading file to S3: " + e.getMessage(), e);
        } finally {
            if (tempFile.exists()) {
                tempFile.delete(); // Delete the temporary file
            }
        }
    }

    private File convertMultiPartFileToFile(MultipartFile file) throws IOException {
        File convertedFile = File.createTempFile("tempFile", null);
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        }
        return convertedFile;
    }
   
}
