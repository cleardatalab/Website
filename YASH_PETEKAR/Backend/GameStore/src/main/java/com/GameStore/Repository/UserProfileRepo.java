package com.GameStore.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.GameStore.Entity.UserProfile;
import com.GameStore.Entity.Users;

public interface UserProfileRepo extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUser(Users user);
}
