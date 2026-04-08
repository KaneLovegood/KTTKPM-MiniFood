package com.example.paymentnotificationservice.integration.order;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class OrderClient {

    private final RestClient restClient;

    public OrderClient(@Value("${order.service.base-url}") String orderServiceBaseUrl) {
        this.restClient = RestClient.builder()
                .baseUrl(orderServiceBaseUrl)
                .build();
    }

    public void updateOrderStatusToPaid(Long orderId) {
        OrderStatusUpdateRequest payload = new OrderStatusUpdateRequest("PAID");
        restClient.put()
                .uri("/orders/{orderId}/status", orderId)
                .contentType(MediaType.APPLICATION_JSON)
                .body(payload)
                .retrieve()
                .toBodilessEntity();
    }
}
