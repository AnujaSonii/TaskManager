package com.example.taskmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.taskmanager.dto.LoginRequest;
import com.example.taskmanager.model.UserInfo;
import com.example.taskmanager.repository.UserRepository;
import com.example.taskmanager.service.UserInfoService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/user")
public class UserController {
	@Autowired 
	private UserRepository userRepository;
	@Autowired
	private UserInfoService userInfoService;
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@PostMapping
	public ResponseEntity<UserInfo> createUser (@RequestBody UserInfo user) {
	    // Check if the email already exists
	    if (userRepository.existsByEmail(user.getEmail())) {
	        return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // Email already exists
	    }
	    
	    // Hash the password before saving
	    user.setPassword(passwordEncoder.encode(user.getPassword()));
	    UserInfo savedUser=userRepository.save(user);
	    
	    return ResponseEntity.status(HttpStatus.CREATED).body(savedUser );
	}
	
	@PostMapping("/login")
	public  ResponseEntity<UserInfo> login(@RequestBody LoginRequest loginRequest) {
	    UserInfo userIn = userInfoService.login(loginRequest.getEmail(), loginRequest.getPassword());
	    if (userIn != null) {
	        return ResponseEntity.status(HttpStatus.CREATED).body(userIn );
	    } else {
	        return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
	    }
	}
}
