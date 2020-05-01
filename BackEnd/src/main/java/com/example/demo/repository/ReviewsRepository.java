package com.example.demo.repository;

import com.example.demo.model.Reviews;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewsRepository extends CrudRepository<Reviews, Long> {
}
