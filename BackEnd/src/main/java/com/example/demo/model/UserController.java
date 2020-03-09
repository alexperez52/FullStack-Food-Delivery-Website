package com.example.demo.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    UserRepository repository;

//    @RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
//    public ResponseEntity<Object> delete(@PathVariable("id") Long id) {
//        repository.deleteById(id);
//        return new ResponseEntity<>("Product is deleted successsfully", HttpStatus.OK);
//    }
//
//    @RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
//    public ResponseEntity<Object> updateUser(@PathVariable("id") Long id, @RequestBody User updatedUser) {
//        //TO FIX LATER
//
//        return new ResponseEntity<>("User is updated successsfully", HttpStatus.OK);
//    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<Object> createProduct(@RequestBody User user) {

        if(!repository.existsUserByEmailOrUserName(user.getEmail(), user.getUserName())) {
            repository.save(user);
            return new ResponseEntity<>("User is created successfully", HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>("user exists", HttpStatus.FOUND);

        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Object> checkLogin(@RequestBody User user) {

        if (repository.existsUserByUserNameAndPassword(user.getUserName(), user.getPassword())) {
            return new ResponseEntity<>("Login Success", HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Incorrect Credentials", HttpStatus.OK);

        }
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<Object> getUsers() {
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }


}
