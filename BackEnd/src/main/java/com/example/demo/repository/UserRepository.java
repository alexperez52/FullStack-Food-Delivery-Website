package com.example.demo.repository;

import com.example.demo.model.Roles;
import com.example.demo.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByUsername(String userName);

    Optional<User> findById(Long id);

    User getUserByUsername(String username);

    List<User> findByRole(Roles role);
    boolean existsUserByEmailOrUsername(String email, String userName);

    boolean existsUserByUsernameAndPassword(String userName, String password);


 }

