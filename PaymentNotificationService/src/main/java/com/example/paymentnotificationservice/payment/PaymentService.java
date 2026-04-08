package com.example.paymentnotificationservice.payment;

import com.example.paymentnotificationservice.integration.notification.NotificationClient;
import com.example.paymentnotificationservice.integration.order.OrderClient;
import com.example.paymentnotificationservice.payment.dto.PaymentRequest;
import com.example.paymentnotificationservice.payment.dto.PaymentResponse;
import java.time.LocalDateTime;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderClient orderClient;
    private final NotificationClient notificationClient;

    public PaymentService(
            PaymentRepository paymentRepository,
            OrderClient orderClient,
            NotificationClient notificationClient
    ) {
        this.paymentRepository = paymentRepository;
        this.orderClient = orderClient;
        this.notificationClient = notificationClient;
    }

    @Transactional
    public PaymentResponse createPayment(PaymentRequest request) {
        orderClient.updateOrderStatusToPaid(request.getOrderId());

        Payment payment = new Payment();
        payment.setOrderId(request.getOrderId());
        payment.setUserId(request.getUserId());
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        payment.setPaidAt(LocalDateTime.now());
        Payment savedPayment = paymentRepository.save(payment);

        notificationClient.sendPaymentSuccessNotification("User " + request.getUserId(), request.getOrderId());
        return toResponse(savedPayment);
    }

    private PaymentResponse toResponse(Payment payment) {
        PaymentResponse response = new PaymentResponse();
        response.setPaymentId(payment.getId());
        response.setOrderId(payment.getOrderId());
        response.setUserId(payment.getUserId());
        response.setAmount(payment.getAmount());
        response.setPaymentMethod(payment.getPaymentMethod());
        response.setPaymentStatus(payment.getPaymentStatus());
        response.setPaidAt(payment.getPaidAt());
        response.setMessage("Payment success and order status updated");
        return response;
    }
}
