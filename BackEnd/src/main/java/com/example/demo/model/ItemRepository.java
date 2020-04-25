package com.example.demo.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends CrudRepository<Item, Long> {

    Optional<Item> findById(Long id);

    Optional<MenuItem> findByNameAndPriceAndDescription(String name, Double price, String description);
    MenuItem getItemById(Long id);

    Optional<MenuItem> findItemById(Long id);

    MenuItem getItemByNameAndPriceAndDescription(String name, Double price, String description);

    List<MenuItem> findByRestaurant(Restaurant restaurant);
}
