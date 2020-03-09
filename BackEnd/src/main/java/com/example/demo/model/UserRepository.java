package com.example.demo.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByUserName(String userName);

    boolean existsUserByEmailOrUserName(String email, String userName);

    boolean existsUserByUserNameAndPassword(String userName, String password);


    }

