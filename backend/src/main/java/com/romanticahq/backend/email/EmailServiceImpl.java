package com.romanticahq.backend.email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final boolean mailEnabled;
    private final String fromEmail;
    private final String fromName;
    private final String publicUrl;

    public EmailServiceImpl(
            JavaMailSender mailSender,
            @Value("${mail.enabled:false}") boolean mailEnabled,
            @Value("${mail.from:no-reply@romanticahq.com}") String fromEmail,
            @Value("${mail.from-name:RomanticaHQ}") String fromName,
            @Value("${app.public-url:https://romanticahq.com}") String publicUrl
    ) {
        this.mailSender = mailSender;
        this.mailEnabled = mailEnabled;
        this.fromEmail = fromEmail;
        this.fromName = fromName;
        this.publicUrl = publicUrl;
    }

    @Override
    public void sendVerificationEmail(String toEmail, String verificationToken) {
        String link = publicUrl + "/auth/verify?token=" + verificationToken;

        if (!mailEnabled) {
            System.out.println("[MAIL DISABLED] Verification link for " + toEmail + ": " + link);
            return;
        }

        sendTextEmail(
                toEmail,
                "Verify your RomanticaHQ account",
                "Welcome to RomanticaHQ!\n\n" +
                        "Please verify your email by clicking the link below:\n" +
                        link + "\n\n" +
                        "If you did not create this account, you can ignore this email."
        );
    }

    @Override
    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        String link = publicUrl + "/reset-password?token=" + resetToken;

        if (!mailEnabled) {
            System.out.println("[MAIL DISABLED] Password reset link for " + toEmail + ": " + link);
            return;
        }

        sendTextEmail(
                toEmail,
                "Reset your RomanticaHQ password",
                "We received a request to reset your password.\n\n" +
                        "Set a new password using the link below:\n" +
                        link + "\n\n" +
                        "If you did not request this, you can ignore this email."
        );
    }

    private void sendTextEmail(String toEmail, String subject, String text) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
            helper.setTo(toEmail);
            helper.setFrom(new InternetAddress(fromEmail, fromName));
            helper.setSubject(subject);
            helper.setText(text, false);
            mailSender.send(mimeMessage);
        } catch (Exception ex) {
            throw new IllegalStateException("Failed to send email.");
        }
    }
}
