package com.example.demo.model;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)

public class MenuItem extends Item {


    public MenuItem(){

    }

    public MenuItem(String name, BigDecimal price, String description, String imageURL){
        super(name, price, description, imageURL);
    }

}
