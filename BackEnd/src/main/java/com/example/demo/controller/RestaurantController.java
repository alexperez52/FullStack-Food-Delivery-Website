package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class RestaurantController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RestaurantRepository restaurantRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    ReviewsRepository reviewsRepository;

    /**
     * This Method adds an address to the currently logged in user. If the user already has an address
     * then the address will be updated.
     * Address is saved in the database and in the address repository.
     * @param address An address object that will be added or updated to the current user's address.
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value ="/restaurantAddress", method = RequestMethod.POST)
    public ResponseEntity<Object> createOrEditAddress(@RequestBody Address address, @CurrentUser MyUserPrincipal principal) {
        if(address != null) {
            if (userRepository.getUserByUsername(principal.getUsername()).getRestaurant().getAddress() == null) {
                userRepository.getUserByUsername(principal.getUsername()).getRestaurant().setAddress(address);
                addressRepository.save(address);
            } else {
                Address updateAddress = userRepository.getUserByUsername(principal.getUsername()).getRestaurant().getAddress();
                UserController.updateAddress(address, updateAddress);
                addressRepository.save(updateAddress);
            }
        }

        return new ResponseEntity<>("ok", HttpStatus.OK);

    }

    /**
     * This method gets the current user's restaurant using the currently logged in user
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Returns a restaurant Object that belongs to the currently logged in user.
     */
    @RequestMapping(value = "/owner", method = RequestMethod.GET)
    public boolean hasRestaurant(@CurrentUser MyUserPrincipal principal){
        User user = userRepository.findByUsername(principal.getUsername()).get();
        return user.getRestaurant() != null;
    }

    /**
     * This method creates a restaurant and assigns it to the currently logged in user. If the user
     * already has a restaurant, then the restaurant is updated.
     * If data fields from the input are empty, then those fields are not changed.
     * Then the restaurant is saved to the database and restaurant repository.
     * @param restaurant A restaurant object as a JSON
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value = "/owner/restaurants", method = RequestMethod.POST)
    public ResponseEntity<Object> createRestaurant(@RequestBody Restaurant restaurant, @CurrentUser MyUserPrincipal principal) {

        if(userRepository.findById(principal.getId()).isPresent()){
            if(userRepository.findById(principal.getId()).get().getRestaurant() == null) {

                userRepository.findById(principal.getId()).get().setRestaurant(restaurant);
                restaurantRepository.save(restaurant);

            }
            else{
                Restaurant updateRest =  userRepository.findById(principal.getId()).get().getRestaurant();
                if(restaurant.getRestaurantName() != null) {
                    updateRest.setRestaurantName(restaurant.getRestaurantName());
                }
                if(restaurant.getCategory() != null) {
                    updateRest.setCategory(restaurant.getCategory());
                }
                if(restaurant.getRatings() != null) {
                    updateRest.setRatings(restaurant.getRatings());
                }
                if(restaurant.getImageURL() != null) {
                    updateRest.setImageURL(restaurant.getImageURL());
                }
                restaurantRepository.save(updateRest);
            }
        }

        return new ResponseEntity<>("Done", HttpStatus.ACCEPTED);
    }


    /**
     * This method removes an item from the database and item repository if it is already present.
     * @param item An item object that contains the ID of an item in the item repository.
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
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

    /**
     * This method creates an item object and is assigned to the currently logged on user's
     * restaurant.
     * Then it saves the item object into the database and item repository.
     * @param item An item object that will be assigned a restaurant
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value = "/owner/restaurants/add", method = RequestMethod.POST)
    public ResponseEntity<Object> addItem(@RequestBody MenuItem item, @CurrentUser MyUserPrincipal principal){

        if(userRepository.findById(principal.getId()).isPresent()){


            item.setRestaurant(userRepository.findById(principal.getId()).get().getRestaurant());
        }
        itemRepository.save(item);

        return new ResponseEntity<Object>("Done", HttpStatus.OK);
    }

    /**
     * This method returns a list of every restaurant inside of the restaurant repository.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value="/restaurants", method = RequestMethod.GET)
    public ResponseEntity<Object> getRestaurants(){

        return new ResponseEntity<Object>(restaurantRepository.getAllByIdNotNull(), HttpStatus.OK);
    }

    /**
     * This method gets all of the items in the item repository that correspond to the
     * currently logged in user.
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value="/items", method = RequestMethod.GET)
    public ResponseEntity<Object> getItems(@CurrentUser MyUserPrincipal principal){
        User user = userRepository.findByUsername(principal.getUsername()).get();

        return new ResponseEntity<>(itemRepository.findByRestaurant(userRepository.findByUsername(user.getUsername()).get().getRestaurant()), HttpStatus.OK);
    }
    /**
     * This method modifies an existing menu item and then saves it to the database
     * and item repository. The existing menu item is updated with the information
     * given through the item object send in the parameter.
     * @param item An item object as a JSON that will be updated and saved
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
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
    /**
     * This method gets a restaurant by a given ID which is provided by
     * the restaurant object sent through the parameters.
     * @param restaurant A restaurant object as a JSON
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value ="/specificRestaurant", method= RequestMethod.POST)
    public ResponseEntity<Object> getRestaurant(@RequestBody Restaurant restaurant){
        Long id = restaurant.getId();
        return new ResponseEntity<>(restaurantRepository.getRestaurantById(id), HttpStatus.OK);
    }

    /**
     * This method gets all items by restaurant ID which is provided through the
     * parameters as a restaurant object JSON.
     * @param restaurant A restaurant object as a JSON
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value="/restaurantItems", method = RequestMethod.POST)
    public ResponseEntity<Object> getRestaurantItems(@RequestBody Restaurant restaurant){
        Restaurant restaurantWithItems = restaurantRepository.getRestaurantById(restaurant.getId());
        return new ResponseEntity<>( itemRepository.findByRestaurant(restaurantWithItems), HttpStatus.OK);
    }

    /**
     * This method creates an invoice and sets it's user to the current user and it's restaurant
     * to the current user's restaurant.
     * Then the invoice is saved to the database and invoice repository.
     * @param invoice An invoice object as a JSON
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value="/invoice", method = RequestMethod.POST)
    public ResponseEntity<Object> createInvoice(@RequestBody Invoice invoice, @CurrentUser MyUserPrincipal principal){
        User user = userRepository.getUserByUsername(principal.getUsername());
        Restaurant foundRestaurant = restaurantRepository.getRestaurantById(invoice.getRestaurant().getId());
        invoice.setUser(user);
        invoice.setRestaurant(foundRestaurant);
        invoiceRepository.save(invoice);
        return new ResponseEntity<>(invoice, HttpStatus.OK);
    }

    /**
     * This method gets all of the existing invoices by the current user's ID that is
     * passed through the parameters.
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value="/userInvoices", method = RequestMethod.GET)
    public ResponseEntity<Object> userInvoices(@CurrentUser MyUserPrincipal principal){
        User user = userRepository.findByUsername(principal.getUsername()).get();

        return new ResponseEntity<>(invoiceRepository.findAllByUser(user), HttpStatus.OK);
    }

    /**
     * This method gets all of the existing invoices by the current user's restaurant's ID that is
     * passed through the parameters.
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value="/specificInvoices", method = RequestMethod.GET)
    public ResponseEntity<Object> getInvoices(@CurrentUser MyUserPrincipal principal){
        User user = userRepository.findByUsername(principal.getUsername()).get();

        return new ResponseEntity<>(invoiceRepository.findAllByRestaurant(user.getRestaurant()), HttpStatus.OK);
    }
    /**
     * This method gets all of the existing invoices that have the data field 'complete' set to false.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value = "/orders", method = RequestMethod.GET)
    public ResponseEntity<Object> getOrdersNotComplete(){

        return new ResponseEntity<>(invoiceRepository.findAllByIsCompleteIsFalse(), HttpStatus.OK);
    }

    /**
     * This method updates an existing invoice in the invoice repository and sets it's 'inProgress'
     * value to true.
     * Then it saves this invoice in to the database and invoice repository.
     * @param invoice An invoice object that contains the ID to an invoice object in the invoice repository.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value = "/acceptOrder", method = RequestMethod.PUT)
    public ResponseEntity<Object> acceptOrder(@RequestBody Invoice invoice){

       Invoice updateInvoice = invoiceRepository.getById(invoice.getId());
        updateInvoice.setInProgress(true);
        invoiceRepository.save(updateInvoice);

        return new ResponseEntity<>("Done", HttpStatus.OK);
    }

    /**
     * This method updates an existing invoice in the invoice repository and sets it's 'complete'
     * value to true.
     * Then it saves this invoice in to the database and invoice repository.
     * @param invoice An invoice object that contains the ID to an invoice object in the invoice repository.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value = "/completeOrder", method = RequestMethod.PUT)
    public ResponseEntity<Object> completeOrder(@RequestBody Invoice invoice){

        Invoice updateInvoice = invoiceRepository.getById(invoice.getId());
        System.out.println(invoice.getId());
        updateInvoice.setComplete(true);
        invoiceRepository.save(updateInvoice);

        return new ResponseEntity<>("Done", HttpStatus.OK);
    }

    /**
     * This method creates a new review object that is saved to the database and review
     * repository. This review's ratings and message are set by the restaurant object's ratings
     * and message data fields that are passed in parameters.
     * @param restaurant A restaurant object that contains an ID which is used to find the
     *                   corresponding restaurant object in the restaurant repository.
     * @param principal A user object with username and password that holds the current logged in user.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value = "/rate", method = RequestMethod.POST)
    public ResponseEntity<Object> rate(@RequestBody Restaurant restaurant, @CurrentUser MyUserPrincipal principal){

        Restaurant updateRestaurant = restaurantRepository.getRestaurantById(restaurant.getId());
        User user = userRepository.getUserByUsername(principal.getUsername());
        Reviews reviews = new Reviews();
        reviews.setRestaurant(updateRestaurant);
        reviews.setUser(user);
        reviews.setRatings(restaurant.getRatings());
        reviews.setMessage(restaurant.getMessage());
        reviewsRepository.save(reviews);

        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }
    /**
     * This method gets all existing ratings by restaurant ID which is passed through
     * the parameters as a JSON.
     * @param restaurant A restaurant object that contains an ID which is used to find the
     *                   corresponding restaurant object in the restaurant repository.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value = "/restaurantRatings", method = RequestMethod.POST)
    public ResponseEntity<Object> getRatings(@RequestBody Restaurant restaurant){

       return new ResponseEntity<> (reviewsRepository.getAllByRestaurantId(restaurant.getId()), HttpStatus.OK);
    }
    /**
     * This method assigns a rating to a restaurant.
     * @param restaurant A restaurant object that contains an ID which is used to find the
     *                   corresponding restaurant object in the restaurant repository.
     * @return Http Status Code ResponseEntity
     */
    @RequestMapping(value = "/setRatings", method = RequestMethod.PUT)
    public ResponseEntity<Object> setRatings(@RequestBody Restaurant restaurant){
        Restaurant update = restaurantRepository.getRestaurantById(restaurant.getId());
        update.setRatings(restaurant.getRatings());
        restaurantRepository.save(update);

        return new ResponseEntity<> (reviewsRepository.getAllByRestaurantId(restaurant.getId()), HttpStatus.OK);
    }

}
