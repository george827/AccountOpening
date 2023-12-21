package com.example.myproj.controller;

import com.example.myproj.entity.User;
import com.example.myproj.repository.UserRepository;
import com.example.myproj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/v1/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser){
        Optional<User> optionalUser = userRepository.findByEmail(loginUser.getEmail());

        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(user.getPassword().equals(loginUser.getPassword())){
//                return ResponseEntity.ok().body("{\"message\": \"Log in Success\"}");
                return ResponseEntity.ok().body(user);

            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User newUser){
        if(userRepository.findByEmail(newUser.getEmail()).isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Email taken\"}");
        }

        userRepository.save(newUser);
        return ResponseEntity.ok().body(newUser);

    }

    @PostMapping("/credit")
    public ResponseEntity<User> credit(@RequestBody Map<String, String> creditInfo) {
        Long userId = Long.parseLong(creditInfo.get("userId"));
        BigDecimal amount = new BigDecimal(creditInfo.get("amount"));

        Optional<User> optionalUser = userService.getUserById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setBalance(user.getBalance().add(amount));
            userService.updateUser(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/debit")
    public ResponseEntity<User> debit(@RequestBody Map<String, String> debitInfo) {
        Long userId = Long.parseLong(debitInfo.get("userId"));
        BigDecimal amount = new BigDecimal(debitInfo.get("amount"));

        Optional<User> optionalUser = userService.getUserById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getBalance().compareTo(amount) >= 0) {
                user.setBalance(user.getBalance().subtract(amount));
                userService.updateUser(user);
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        Optional<User> optionalUser = userService.getUserById(user.getId());
        if (optionalUser.isPresent()) {
            // Update user information
            User updatedUser = userService.updateUser(user);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> userOptional = userService.getUserById(id);
        return userOptional
                .map(user -> ResponseEntity.ok().body(user))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
