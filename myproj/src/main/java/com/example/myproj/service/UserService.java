package com.example.myproj.service;

import com.example.myproj.entity.User;
import com.example.myproj.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(Long userId){
        return userRepository.findById(userId);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid User id"+id));
        return user;
    }

    public User updateUser(User updatedUser) {
        Optional<User> optionalUser = userRepository.findById(updatedUser.getId());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Update only the necessary fields (name, email, password)
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());

            // Check if the password is provided and update it
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                String Password = updatedUser.getPassword();
                user.setPassword(Password);
            }

            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public User creditAmount(Long userId, BigDecimal amount) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setBalance(user.getBalance().add(amount));
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public User debitAmount(Long userId, BigDecimal amount) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getBalance().compareTo(amount) >= 0) {
                user.setBalance(user.getBalance().subtract(amount));
                return userRepository.save(user);
            } else {
                throw new RuntimeException("Insufficient funds");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

}
