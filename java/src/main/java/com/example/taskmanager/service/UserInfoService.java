package com.example.taskmanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.taskmanager.model.UserInfo;
import com.example.taskmanager.repository.UserRepository;

@Service
public class UserInfoService {
	@Autowired
    private UserRepository userInfoRepository;

    
    public final PasswordEncoder passwordEncoder;
    
    @Autowired
    public UserInfoService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder; // Injecting the PasswordEncoder bean
    }

    public UserInfo login(String email, String password) {
        Optional<UserInfo> userOptional = userInfoRepository.findByEmail(email);
        System.out.println(userInfoRepository.findAll());
        if (userOptional.isPresent()) {
            UserInfo userInfo = userOptional.get();
            if(passwordEncoder.matches(password, userInfo.getPassword())){
            	return userInfo;
            }
        }
//        return false; // User not found
        return null;
    }

}
