package com.example.demo.repository;

import com.example.demo.model.Invoice;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface InvoiceRepository extends CrudRepository<Invoice, Long> {



}
