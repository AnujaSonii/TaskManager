package com.example.taskmanager.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.example.taskmanager.model.UserInfo;

@Repository("UserRepository")
public interface UserRepository extends JpaRepository<UserInfo, Long>,JpaSpecificationExecutor<UserInfo> {
	Optional<UserInfo> findByEmail(String email);
	UserInfo save(UserInfo user);
    boolean existsByEmail(String email);

}
