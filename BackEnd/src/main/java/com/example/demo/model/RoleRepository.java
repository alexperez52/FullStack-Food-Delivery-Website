package com.example.demo.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<Roles, Long> {

    boolean existsByRole(String role);

    Roles getRolesByRole(String role);

}
