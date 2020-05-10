package com.example.demo.repository;

import com.example.demo.model.Reviews;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewsRepository extends CrudRepository<Reviews, Long> {

    List<Reviews> getAllByRestaurantId(Long id);
}
