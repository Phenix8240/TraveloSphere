package com.hotel.hotels.service;

import com.hotel.hotels.dto.CreateFeedbackDTO;
import com.hotel.hotels.dto.FeedbackDTO;
import com.hotel.hotels.entity.Customer;
import com.hotel.hotels.entity.Feedback;
import com.hotel.hotels.exception.ResourceNotFoundException;
import com.hotel.hotels.repo.CustomerRepository;
import com.hotel.hotels.repo.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository, CustomerRepository customerRepository) {
        this.feedbackRepository = feedbackRepository;
        this.customerRepository = customerRepository;
    }

    public FeedbackDTO createFeedback(CreateFeedbackDTO feedbackDTO) {
        Customer customer = customerRepository.findById(feedbackDTO.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + feedbackDTO.getCustomerId()));

        Feedback feedback = new Feedback();
        feedback.setComment(feedbackDTO.getComment());
        feedback.setRating(feedbackDTO.getRating());
        feedback.setCustomer(customer);
        feedback.setCreatedAt(LocalDateTime.now());

        Feedback savedFeedback = feedbackRepository.save(feedback);
        return convertToDTO(savedFeedback);
    }

    public List<FeedbackDTO> getAllFeedbacks() {
        return feedbackRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public FeedbackDTO getFeedbackById(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + id));
        return convertToDTO(feedback);
    }

    public List<FeedbackDTO> getFeedbacksByCustomerId(Long customerId) {
        return feedbackRepository.findByCustomerId(customerId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public FeedbackDTO updateFeedback(Long id, CreateFeedbackDTO feedbackDTO) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + id));

        feedback.setComment(feedbackDTO.getComment());
        feedback.setRating(feedbackDTO.getRating());

        Feedback updatedFeedback = feedbackRepository.save(feedback);
        return convertToDTO(updatedFeedback);
    }

    public void deleteFeedback(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + id));
        feedbackRepository.delete(feedback);
    }

    private FeedbackDTO convertToDTO(Feedback feedback) {
        return new FeedbackDTO(
                feedback.getId(),
                feedback.getComment(),
                feedback.getRating(),
                feedback.getCreatedAt(),
                feedback.getCustomer().getId(),
                feedback.getCustomer().getName()
        );
    }
}