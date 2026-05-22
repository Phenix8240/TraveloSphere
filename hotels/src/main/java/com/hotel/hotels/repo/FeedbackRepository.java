package com.hotel.hotels.repo;

import com.hotel.hotels.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByCustomerId(Long customerId);
    List<Feedback> findByRatingGreaterThanEqual(Integer rating);
    List<Feedback> findAllByOrderByCreatedAtDesc();
}
