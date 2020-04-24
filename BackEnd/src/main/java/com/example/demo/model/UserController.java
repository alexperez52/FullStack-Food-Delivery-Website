package com.example.demo.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.swing.plaf.multi.MultiButtonUI;
import java.util.Stack;

@RestController
public class UserController {
    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository repository;

    @Autowired
    RoleRepository roleRepository;



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
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public MyUserPrincipal testing(@CurrentUser MyUserPrincipal principal){

        return principal;
    }

//    @RequestMapping(value = "/owner/restaurants", method = RequestMethod.POST)
//    public ResponseEntity<Object> createRestaurant(@RequestBody Restaurant restaurant) {
//
//        if(repository.findByUsername(currentUser).isPresent()){
//            repository.findByUsername(currentUser).get().setRestaurant(restaurant);
//
//        }
//        restaurantRepository.save(restaurant);
//
//        return new ResponseEntity<>("Done", HttpStatus.ACCEPTED);
//    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<Object> createProduct(@RequestBody User user) {

        if(!repository.existsUserByEmailOrUsername(user.getUsername(), user.getEmail())) {
            if(roleRepository.existsByRole(user.getRole().getRole())){
                user.setRole(roleRepository.getRolesByRole(user.getRole().getRole()));
            }
            else{
                user.setRole(user.getRole());
            }

            user.setEmail(user.getEmail());
            user.setUsername(user.getUsername());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            repository.save(user);
            return new ResponseEntity<>("User is created successfully", HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>("user exists", HttpStatus.FOUND);

        }
    }
    @PostMapping(value = "/logout5")
    public void logout(HttpServletRequest request) throws ServletException {
        SecurityContextHolder.clearContext();
        request.logout();
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Object> checkLogin(@RequestBody User user) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) authentication.getPrincipal();

        SecurityContextHolder.getContext().setAuthentication(authentication);
    //clear context to log out
        return new ResponseEntity<Object>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<Object> getUsers() {
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }


}
