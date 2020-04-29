package com.example.demo.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
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



}
