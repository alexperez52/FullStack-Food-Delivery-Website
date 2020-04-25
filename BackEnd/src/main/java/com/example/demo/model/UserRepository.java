package com.example.demo.model;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
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

