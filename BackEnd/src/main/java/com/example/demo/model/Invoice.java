package com.example.demo.model;


import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name= "invoice")
public class Invoice {

    @Id
    @GeneratedValue
    @Column(name="invoice_id")
    private Long id;
    private boolean isInProgress;
    private boolean isComplete;
    private BigDecimal tax;
    private String time;
    private BigDecimal rawBill;
    private BigDecimal bill;
    private String information;
    private String date;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "restaurant_id" , referencedColumnName = "restaurant_id")
    private Restaurant restaurant;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name ="user_id", referencedColumnName = "user_id")
    private User user;


    public boolean isInProgress() {
        return isInProgress;
    }

    public void setInProgress(boolean inProgress) {
        isInProgress = inProgress;
    }

    public boolean isComplete() {
        return isComplete;
    }

    public void setComplete(boolean complete) {
        isComplete = complete;
    }

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

    public BigDecimal getBill() {
        return bill;
    }

    public void setBill(BigDecimal bill) {
        this.bill = bill;
    }

    public BigDecimal getTax() {
        return tax;
    }

    public void setTax(BigDecimal tax) {
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

    public BigDecimal getRawBill() {
        return rawBill;
    }

    public void setRawBill(BigDecimal rawBill) {
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
