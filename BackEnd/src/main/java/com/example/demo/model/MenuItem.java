package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)

public class MenuItem extends Item {

    public MenuItem(){

    }

    public MenuItem(String name,  Double price, String description,String imageURL){
        super(name, price, description, imageURL);
    }

}
