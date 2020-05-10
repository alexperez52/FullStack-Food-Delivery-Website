package com.example.demo.repository;

import com.example.demo.model.Invoice;
import com.example.demo.model.MenuItem;
import com.example.demo.model.Restaurant;
import com.example.demo.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface InvoiceRepository extends CrudRepository<Invoice, Long> {

    List<Invoice> findAllByRestaurant(Restaurant restaurant);

    List<Invoice> findAllByUser(User user);
    List<Invoice> findAllByIsCompleteIsFalse();

    Invoice getById(Long id);

    Invoice getInvoiceByTime(String time);


}
