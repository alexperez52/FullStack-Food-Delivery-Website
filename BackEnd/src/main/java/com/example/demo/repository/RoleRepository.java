package com.example.demo.repository;

import com.example.demo.model.Roles;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<Roles, Long> {

    boolean existsByRole(String role);

    Roles getRolesByRole(String role);

}
