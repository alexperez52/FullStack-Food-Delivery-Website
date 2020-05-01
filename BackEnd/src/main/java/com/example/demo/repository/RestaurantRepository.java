package com.example.demo.repository;

import com.example.demo.model.Restaurant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends CrudRepository<Restaurant, Long> {

    Restaurant getRestaurantById(Long id);


    List<Restaurant> getAllByIdNotNull();
}
