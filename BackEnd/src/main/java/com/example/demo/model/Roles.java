package com.example.demo.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")
public class Roles {

    @Id
    @GeneratedValue
    @Column(name ="role_id")
    private Long id;


    @Column(name="user_role")
    private String role;

    public Long getId() {
        return id;
    }



    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
//    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    private List<User> userList;
//
//

}
