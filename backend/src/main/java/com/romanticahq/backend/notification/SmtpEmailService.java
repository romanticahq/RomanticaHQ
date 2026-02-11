package com.romanticahq.backend.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class SmtpEmailService implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(SmtpEmailService.class);

    private final JavaMailSender mailSender;
    private final boolean enabled;
    private final String fromAddress;
    private final String publicBaseUrl;

    public SmtpEmailService(
            JavaMailSender mailSender,
            @Value("${app.email.enabled:false}") boolean enabled,
            @Value("${app.email.from:no-reply@romanticahq.com}") String fromAddress,
            @Value("${app.publicBaseUrl:https://romanticahq.com}") String publicBaseUrl
    ) {
        this.mailSender = mailSender;
        this.enabled = enabled;
        this.fromAddress = fromAddress;
        this.publicBaseUrl = stripTrailingSlash(publicBaseUrl);
    }

    @Override
    public void sendVerificationEmail(String toEmail, String token) {
        String link = publicBaseUrl + "/auth/verify?token=" + encode(token);
        String subject = "Verify your RomanticaHQ email";
        String body = """
                Welcome to RomanticaHQ,

                Please verify your email by opening this link:
                %s

                If you did not create this account, you can ignore this email.
                """.formatted(link);
        sendEmail(toEmail, subject, body, "Verification", link);
    }

    @Override
    public void sendPasswordResetEmail(String toEmail, String token) {
        String link = publicBaseUrl + "/reset-password?token=" + encode(token);
        String subject = "Reset your RomanticaHQ password";
        String body = """
                We received a password reset request for your RomanticaHQ account.

                You can reset your password here:
                %s

                If you did not request this, you can ignore this email.
                """.formatted(link);
        sendEmail(toEmail, subject, body, "Password reset", link);
    }

    private void sendEmail(String toEmail, String subject, String body, String logType, String link) {
        if (!enabled) {
            log.info("{} email disabled. {} link for {}: {}", logType, logType, toEmail, link);
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        try {
            mailSender.send(message);
        } catch (RuntimeException ex) {
            log.error("Failed to send {} email to {}", logType.toLowerCase(), toEmail, ex);
            throw new IllegalStateException("Unable to send email right now. Please try again.");
        }
    }

    private static String encode(String v) {
        return URLEncoder.encode(v, StandardCharsets.UTF_8);
    }

    private static String stripTrailingSlash(String url) {
        if (url == null || url.isBlank()) return "https://romanticahq.com";
        if (url.endsWith("/")) return url.substring(0, url.length() - 1);
        return url;
    }
}

