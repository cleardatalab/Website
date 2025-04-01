package com.GameStore.Service;

import java.io.IOException;
import java.nio.file.*;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.GameStore.Entity.UserProfile;
import com.GameStore.Entity.Users;
import com.GameStore.Repository.UserProfileRepo;
import com.GameStore.Repository.UsersRepo;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepo userProfileRepo;

    @Autowired
    private UsersRepo usersRepo;

    private static final String UPLOAD_DIR = "uploads/profile_pictures/";

    public String saveProfileImage(MultipartFile file, Long userProfileId) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null) {
            throw new IOException("Invalid file name.");
        }

        String cleanedFileName = originalFileName.replaceAll("\\s+", "_") 
                                                 .replaceAll("[^a-zA-Z0-9._-]", ""); 

        String fileName = userProfileId + "_" + cleanedFileName; 
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return fileName;  
    }


    public UserProfile updateUserProfile(Long userId, String firstName, String lastName, String mobile, String dob, String country, String state, String city, MultipartFile profileImage) throws IOException {
        Users user = usersRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Optional<UserProfile> optionalProfile = userProfileRepo.findByUser(user);

        UserProfile userProfile = optionalProfile.orElse(new UserProfile(user, firstName, lastName, mobile, dob, country, state, city, null));

        // Update user profile details
        userProfile.setFirstName(firstName);
        userProfile.setLastName(lastName);
        userProfile.setMobile(mobile);
        userProfile.setDob(dob);
        userProfile.setCountry(country);
        userProfile.setState(state);
        userProfile.setCity(city);

        // Save userProfile first (to generate userProfileId if new)
        userProfile = userProfileRepo.save(userProfile);

        // Now save the profile image if provided
        if (profileImage != null && !profileImage.isEmpty()) {
            String imageName = saveProfileImage(profileImage, userProfile.getUserProfileId());
            userProfile.setProfileImagePath(imageName);
            userProfile = userProfileRepo.save(userProfile); // Save again with image path
        }

        return userProfile;
    }

    public Optional<UserProfile> getUserProfileById(Long userId) {
        Users user = usersRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return userProfileRepo.findByUser(user);
    }
}
