package com.example.demo.model;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name= "invoice")
public class Invoice {

    @Id
    @GeneratedValue
    @Column(name="invoice_id")
    private Long id;

    private Double tax;

    private String time;
    private Double rawBill;
    private Double bill;

    private String information;
    private String date;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "restaurant_id" , referencedColumnName = "restaurant_id")
    private Restaurant restaurant;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name ="user_id", referencedColumnName = "user_id")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getBill() {
        return bill;
    }

    public void setBill(Double bill) {
        this.bill = bill;
    }

    public Double getTax() {
        return tax;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Double getRawBill() {
        return rawBill;
    }

    public void setRawBill(Double rawBill) {
        this.rawBill = rawBill;
    }



    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }




}
