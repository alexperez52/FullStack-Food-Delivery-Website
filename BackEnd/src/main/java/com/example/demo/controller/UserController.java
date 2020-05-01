package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.repository.AddressRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

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

    @Autowired
    AddressRepository addressRepository;


    @RequestMapping(value ="/address", method = RequestMethod.POST)
    public ResponseEntity<Object> createOrEditAddress(@RequestBody Address address, @CurrentUser MyUserPrincipal principal){

        if(repository.getUserByUsername(principal.getUsername()).getAddress() == null){
            repository.getUserByUsername(principal.getUsername()).setAddress(address);
            addressRepository.save(address);
        }
        else{
            Address updateAddress = repository.getUserByUsername(principal.getUsername()).getAddress();
            updateAddress(address, updateAddress);

            addressRepository.save(repository.getUserByUsername(principal.getUsername()).getAddress());
        }

        return new ResponseEntity<>("ok", HttpStatus.OK);

    }

    static void updateAddress(@RequestBody Address address, Address updateAddress) {
        if(address.getAddressLine() != null){
            updateAddress.setAddressLine(address.getAddressLine());
        }
        if(address.getState() != null){
            updateAddress.setState(address.getState());
        }
        if(address.getTown() != null){
            updateAddress.setTown(address.getTown());
        }
        if(address.getZipCode() != null){
            updateAddress.setZipCode(address.getZipCode());
        }
    }


    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public ResponseEntity<Object> testing(@CurrentUser MyUserPrincipal principal){
            if(principal==null) {
                User dummy = new User();
                dummy.setUsername("dummy");
                return new ResponseEntity<>(dummy,HttpStatus.OK);
            }
            else {
                User user = repository.getUserByUsername(principal.getUsername());
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
    }

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
        user = repository.getUserByUsername(user.getUsername());
    //clear context to log out
        return new ResponseEntity<Object>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<Object> getUsers() {

        String a = "OWNER";

        return new ResponseEntity<>(repository.findByRole(roleRepository.getRolesByRole(a)), HttpStatus.OK);
    }

    @RequestMapping(value ="/currentUser", method = RequestMethod.GET)
    public ResponseEntity<Object> getUser(@CurrentUser MyUserPrincipal principal){

        if(principal != null) {
            if (repository.findByUsername(principal.getUsername()).isPresent()) {
                return new ResponseEntity<>(repository.getUserByUsername(principal.getUsername()), HttpStatus.OK);

            } else {
                User dummy = new User();
                return new ResponseEntity<>(dummy, HttpStatus.OK);

            }
        }
        return new ResponseEntity<>("not logged in", HttpStatus.OK);
    }


}
