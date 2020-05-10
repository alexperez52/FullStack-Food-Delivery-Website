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
import java.math.BigDecimal;

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

    /**
     * This method edits the current user's information with the information contained inside
     * another user object which is passed through the parameters as a JSON.
     * THen the updated user is saved in the database and user repository.
     * @param user A user object passed in as a JSON
     *                   corresponding user object in the user repository.
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value= "/updateUser", method = RequestMethod.POST)
    public ResponseEntity<Object> editUser(@RequestBody User user, @CurrentUser MyUserPrincipal principal){

        User updatedUser = repository.findByUsername(principal.getUsername()).get();
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setUsername(user.getUsername());
        updatedUser.setEmail(user.getEmail());

        if(user.getPassword() != null) {
            updatedUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        repository.save(updatedUser);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    /**
     * This method edits the current user's address with the information contained inside
     * the address object that is passed in through the parameters as a JSON. Then the address
     * is saved in the database and address repository.
     * @param address An address object passed in as a JSON
     *                   corresponding address object in the address repository.
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value ="/address", method = RequestMethod.POST)
    public ResponseEntity<Object> createOrEditAddress(@RequestBody Address address, @CurrentUser MyUserPrincipal principal){

        if(repository.getUserByUsername(principal.getUsername()).getAddress() ==null){
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
    /**
     * This method checks if the address object provided through the parameters
     * is null. If its null, then it does not update that data field in the
     * already existing address.
     * @param address An address object passed in as a JSON
     *                   corresponding restaurant object in the restaurant repository.
     * @param updateAddress An address object passed in as a JSON that contains
     *                      the new information that the already existing address
     *                      will be updated to.
     */
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

    /**
     * This method gets a user object that is found by using the currently logged in
     * user's username.
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
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

    /**
     * This method registers a user with the information sent in the parameters.
     * Then this user object is saved in the database and user repository.
     * @param user A user object that is sent as a JSON who's ID corresponds
     *             to an existing user object in the user repository.
     * @return Http Status Code ResponseEntity
     */
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

    /**
     * This method logs a user out and clears the security context.
     * @param request
     * @throws ServletException
     */
    @PostMapping(value = "/logout5")
    public void logout(HttpServletRequest request) throws ServletException {
        SecurityContextHolder.clearContext();
        request.logout();
    }

    /**
     * This method logs in and authenticates a user if the information sent in the
     * parameters corresponds to an existing user's username and password in the
     * user repository.
     * @param user A user object that is sent as a JSON
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Object> checkLogin(@RequestBody User user) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) authentication.getPrincipal();

        SecurityContextHolder.getContext().setAuthentication(authentication);
        user = repository.getUserByUsername(user.getUsername());
    //clear context to log out
        return new ResponseEntity<Object>(user, HttpStatus.OK);
    }

    /**
     * This method gets all users that have the role "OWNER"
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<Object> getUsers() {

        String a = "OWNER";

        return new ResponseEntity<>(repository.findByRole(roleRepository.getRolesByRole(a)), HttpStatus.OK);
    }

    /**
     *This method gets the currently logged in user as a user object. If it is not found then it returns
     * a dummy user with null values.
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
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

    /**
     * This method gets the currently logged in user and adds to that that user's 'earnings'
     * value with the value provided in a new user object through the parameters.
     * Then it saves this user to the database and user repository.
     * @param principal A user object with username and password that holds the current logged in user.
     * @param user A user object that contains a unique username corresponding to
     *             an existing user in the user repository.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value="/payUser", method = RequestMethod.PUT)
    public ResponseEntity<Object> payUser(@CurrentUser MyUserPrincipal principal, @RequestBody User user){
    User payedUser = repository.getUserByUsername(principal.getUsername());
    payedUser.setEarnings(payedUser.getEarnings().add(user.getEarnings()));
    repository.save(payedUser);

    System.out.println(payedUser.getEarnings());

    return new ResponseEntity<>("Done", HttpStatus.OK);
    }


}
