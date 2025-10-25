package com.backend.menu;

import com.backend.menu.dtos.MenuItemCreateDTO;
import com.backend.menu.dtos.MenuItemDetailDTO;
import com.backend.menu.dtos.MenuItemNestedDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.List;

@Service
public class MenuItemService {
    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository menuCategoryRepository;

    @Value("${aws.bucket.name}")
    private String bucketName;

    @Value("${cloud.aws.region}")
    private String region;

    @Autowired
    private final S3Client s3Client;

    public MenuItemService(MenuItemRepository menuItemRepository, MenuCategoryRepository menuCategoryRepository, S3Client s3Client) {
        this.menuItemRepository = menuItemRepository;
        this.menuCategoryRepository = menuCategoryRepository;
        this.s3Client = s3Client;
    }

    public MenuItemDetailDTO getMenuItemById(Integer menuItemId) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "MenuItem not found with id " + menuItemId
                ));
        return new MenuItemDetailDTO(menuItem);
    }

    public MenuItemDetailDTO insertMenuItem(MenuItemCreateDTO dto) {
        MenuCategory menuCategory = menuCategoryRepository.findById(dto.getMenuCategory())
                .orElseThrow(() -> new IllegalArgumentException("Invalid menu category id: " + dto.getMenuCategory()));

        MenuItem menuItem = new MenuItem();
        menuItem.setName(dto.getName());
        menuItem.setVisibility(dto.getVisibility());
        menuItem.setHalf_tray_price(dto.getHalf_tray_price());
        menuItem.setFull_tray_price(dto.getFull_tray_price());
        menuItem.setImage(dto.getImage());
        menuItem.setMenuCategory(menuCategory);

        MenuItem saved = menuItemRepository.save(menuItem);
        return new MenuItemDetailDTO(saved);
    }

    public MenuItemDetailDTO updateMenuItem(MenuItemNestedDTO dto) {
        MenuCategory menuCategory = menuCategoryRepository.findById(dto.getMenuCategory())
                .orElseThrow(() -> new IllegalArgumentException("Invalid menu category id: " + dto.getMenuCategory()));

        MenuItem menuItem = menuItemRepository.findById(dto.getId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid menu item id: " + dto.getId()));

        menuItem.setName(dto.getName());
        menuItem.setVisibility(dto.getVisibility());
        menuItem.setHalf_tray_price(dto.getHalf_tray_price());
        menuItem.setFull_tray_price(dto.getFull_tray_price());
        menuItem.setImage(dto.getImage());
        menuItem.setMenuCategory(menuCategory);

        MenuItem updated = menuItemRepository.save(menuItem);

        return new MenuItemDetailDTO(updated);
    }

    public void deleteMenuItem(Integer id){ menuItemRepository.deleteById(id); }

    public String updateImageForMenuItem (Integer menuItemId, MultipartFile image) throws IOException {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new IllegalArgumentException("Menu item with id " + menuItemId + " not found"));

        if(image == null){
            throw new IllegalArgumentException("File cannot be empty");
        }

        try {
            String key = menuItem.getId().toString();
            String imageUrl = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + key;

            // Delete prior image if it exists
            s3Client.deleteObject(
                    DeleteObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .build()
            );

            s3Client.putObject(
                    PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .contentType(image.getContentType())
                            .build(),
                    RequestBody.fromBytes(image.getBytes())
            );

            menuItem.setImage(imageUrl);
            menuItemRepository.save(menuItem);
            return imageUrl;

        } catch (S3Exception | IOException e) {
            System.out.println(e);
            throw new RuntimeException("Failed to upload file", e);
        }
    }

    public void deleteImageForMenuItem (Integer menuItemId) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new IllegalArgumentException("Menu item with id " + menuItemId + " not found"));

        try {
            String key = menuItem.getId().toString();

            s3Client.deleteObject(
                    DeleteObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .build()
            );

            menuItem.setImage("");
            menuItemRepository.save(menuItem);
        } catch (S3Exception e) {
            System.out.println(e);
            throw new RuntimeException("Failed to delete file", e);
        }
    }
}