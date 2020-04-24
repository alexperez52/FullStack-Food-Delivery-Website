package com.example.demo.model;

import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import java.util.List;

@Entity
@Table (name="users")
public class User {

    @Id
    @GeneratedValue
    @Column(name="user_id")
    private Long id;
    private String firstName;
    private String lastName;

    private String username;
    private String password;

    private String email;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name= "role_id", referencedColumnName = "role_id")
    private Roles role;

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "restaurant_id" , referencedColumnName = "restaurant_id")
    private Restaurant restaurant;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }



    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String userName) {
        this.username = userName;
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
