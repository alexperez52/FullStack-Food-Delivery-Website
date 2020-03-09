package com.example.demo.model;

import org.springframework.context.annotation.Role;

import javax.persistence.*;

@Entity
@Table (name="users")
public class User {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;
    @Column(name="username")
    private String userName;
    @Column(name="password")
    private String password;
    @Column(name="email")
    private String email;





    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
