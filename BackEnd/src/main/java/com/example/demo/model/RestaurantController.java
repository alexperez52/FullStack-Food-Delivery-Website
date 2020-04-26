package com.example.demo.model;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class RestaurantController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RestaurantRepository restaurantRepository;

    @Autowired
    ItemRepository itemRepository;

    @RequestMapping(value = "/owner", method = RequestMethod.GET)
    public boolean hasRestaurant(@CurrentUser MyUserPrincipal principal){
        User user = userRepository.findByUsername(principal.getUsername()).get();
        return user.getRestaurant() != null;
    }

    @RequestMapping(value = "/owner/restaurants", method = RequestMethod.POST)
    public ResponseEntity<Object> createRestaurant(@RequestBody Restaurant restaurant, @CurrentUser MyUserPrincipal principal) {

        if(userRepository.findById(principal.getId()).isPresent()){
            userRepository.findById(principal.getId()).get().setRestaurant(restaurant);

        }
        restaurantRepository.save(restaurant);

        return new ResponseEntity<>("Done", HttpStatus.ACCEPTED);
    }



    @RequestMapping(value = "owner/restaurants/add", method = RequestMethod.PUT)
    public ResponseEntity<Object> removeItem(@RequestBody MenuItem item, @CurrentUser MyUserPrincipal principal){
        MenuItem deletionItem = itemRepository.getItemById(item.getId());
        if(userRepository.findById(principal.getId()).isPresent()){
               if(itemRepository.findItemById(deletionItem.getId()).isPresent()){
                itemRepository.delete(deletionItem);
                }
        }


        return new ResponseEntity<>("Done", HttpStatus.OK);
    }


    @RequestMapping(value = "/owner/restaurants/add", method = RequestMethod.POST)
    public ResponseEntity<Object> addItem(@RequestBody MenuItem item, @CurrentUser MyUserPrincipal principal){

        if(userRepository.findById(principal.getId()).isPresent()){

            item.setRestaurant(userRepository.findById(principal.getId()).get().getRestaurant());
        }
        itemRepository.save(item);

        return new ResponseEntity<Object>("Done", HttpStatus.OK);
    }

    @RequestMapping(value="/restaurants", method = RequestMethod.GET)
    public ResponseEntity<Object> getRestaurants(){

        return new ResponseEntity<Object>(restaurantRepository.getAllByIdNotNull(), HttpStatus.OK);
    }

    @RequestMapping(value="/items", method = RequestMethod.GET)
    public ResponseEntity<Object> getItems(@CurrentUser MyUserPrincipal principal){
        User user = userRepository.findByUsername(principal.getUsername()).get();

        return new ResponseEntity<>(itemRepository.findByRestaurant(userRepository.findByUsername(user.getUsername()).get().getRestaurant()), HttpStatus.OK);
    }

    @RequestMapping(value="/items", method = RequestMethod.PUT)
    public ResponseEntity<Object> editItems(@RequestBody MenuItem item, @CurrentUser MyUserPrincipal principal){

        if(itemRepository.findItemById(item.getId()).isPresent()){
            itemRepository.getItemById(item.getId()).setName(item.getName());
            itemRepository.getItemById(item.getId()).setDescription(item.getDescription());
            itemRepository.getItemById(item.getId()).setPrice(item.getPrice());
            itemRepository.getItemById(item.getId()).setImageURL(item.getImageURL());

            itemRepository.save(itemRepository.getItemById(item.getId()));
        }


        return new ResponseEntity<>("ok", HttpStatus.OK);
    }

}
