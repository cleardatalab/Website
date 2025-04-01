package com.GameStore.Controller;

import java.io.IOException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.GameStore.Entity.UserProfile;
import com.GameStore.Service.UserProfileService;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;


@RestController
@RequestMapping("/api/profiles")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    // **Update Profile**
    @PutMapping("/users/{userId}/update-profile")
    public ResponseEntity<UserProfile> updateUserProfile(
            @PathVariable Long userId, 
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("mobile") String mobile,
            @RequestParam("dob") String dob,
            @RequestParam("country") String country,
            @RequestParam("state") String state,
            @RequestParam("city") String city,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) throws IOException {

        UserProfile updatedProfile = userProfileService.updateUserProfile(
                userId, firstName, lastName, mobile, dob, country, state, city, profileImage);

        return ResponseEntity.ok(updatedProfile);
    }

    // **Fetch Profile**
    @GetMapping("/users/{userId}")
    public ResponseEntity<UserProfile> getUserProfile(@PathVariable Long userId) {
        Optional<UserProfile> userProfile = userProfileService.getUserProfileById(userId);

        if (userProfile.isPresent()) {
            UserProfile profile = userProfile.get();

            // Convert stored file name to accessible URL
            if (profile.getProfileImagePath() != null && !profile.getProfileImagePath().isEmpty()) {
            	String imageUrl;
            	try {
            	    imageUrl = "http://localhost:8082/uploads/profile_pictures/" + 
            	               URLEncoder.encode(profile.getProfileImagePath(), StandardCharsets.UTF_8.toString());
            	} catch (Exception e) {
            	    imageUrl = "http://localhost:8082/uploads/profile_pictures/" + profile.getProfileImagePath();
            	}

            	profile.setProfileImagePath(imageUrl);
            }

            return ResponseEntity.ok(profile);
        }
        return ResponseEntity.notFound().build();
    }
}
