package com.example.demo.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")
public class Roles {

    @Id
    @GeneratedValue
    @Column(name ="user_id")
    private Long id;


    @Column(name="user_role")
    private String role;

    @OneToMany(mappedBy = "role")
    private List<User> userList;



}
