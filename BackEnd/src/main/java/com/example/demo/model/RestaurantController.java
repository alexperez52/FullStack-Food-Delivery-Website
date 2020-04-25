package com.example.demo.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.awt.*;

@RestController
public class RestaurantController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RestaurantRepository restaurantRepository;

    @Autowired
    ItemRepository itemRepository;

    @RequestMapping(value = "/owner/restaurants", method = RequestMethod.POST)
    public ResponseEntity<Object> createRestaurant(@RequestBody Restaurant restaurant, @CurrentUser MyUserPrincipal principal) {

        if(userRepository.findById(principal.getId()).isPresent()){
            userRepository.findById(principal.getId()).get().setRestaurant(restaurant);

        }
        restaurantRepository.save(restaurant);

        return new ResponseEntity<>("Done", HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/owner/restaurants/add", method = RequestMethod.POST)
    public ResponseEntity<Object> addItem(@RequestBody MenuItem item, @CurrentUser MyUserPrincipal principal){

        if(userRepository.findById(principal.getId()).isPresent()){

            item.setRestaurant(userRepository.findById(principal.getId()).get().getRestaurant());
        }
        itemRepository.save(item);

        return new ResponseEntity<Object>("Done", HttpStatus.OK);
    }

}
