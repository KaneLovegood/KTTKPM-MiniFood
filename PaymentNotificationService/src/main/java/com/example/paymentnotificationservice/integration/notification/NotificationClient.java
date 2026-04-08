package com.example.paymentnotificationservice.integration.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class NotificationClient {

    private static final Logger log = LoggerFactory.getLogger(NotificationClient.class);

    private final String notificationServiceBaseUrl;

    public NotificationClient(@Value("${notification.service.base-url:}") String notificationServiceBaseUrl) {
        this.notificationServiceBaseUrl = notificationServiceBaseUrl == null ? "" : notificationServiceBaseUrl.trim();
    }

    public void sendPaymentSuccessNotification(String userDisplayName, Long orderId) {
        String message = userDisplayName + " da dat don #" + orderId + " thanh cong";
        log.info("Notification: {}", message);

        if (notificationServiceBaseUrl.isEmpty()) {
            return;
        }

        RestClient restClient = RestClient.builder()
                .baseUrl(notificationServiceBaseUrl)
                .build();

        restClient.post()
                .uri("/notifications")
                .contentType(MediaType.APPLICATION_JSON)
                .body(new NotificationRequest(message))
                .retrieve()
                .toBodilessEntity();
    }
}
