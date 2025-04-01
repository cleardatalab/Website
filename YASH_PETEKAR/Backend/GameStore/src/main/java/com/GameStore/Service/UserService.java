package com.GameStore.Service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.GameStore.Entity.Users;
import com.GameStore.Repository.UsersRepo;

@Service
public class UserService {

    @Autowired
    private UsersRepo usersRepo;

    public Users registerUser(Users user) {
        return usersRepo.save(user);
    }

    public Users loginUser(String email, String password) {
        Optional<Users> user = usersRepo.findByEmail(email);
        return user.filter(value -> value.getPassword().equals(password)).orElse(null);
    }

}
