package com.romanticahq.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.URI;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class CsrfOriginFilter extends OncePerRequestFilter {

    private final Set<String> allowedOrigins;

    public CsrfOriginFilter(
            @Value("${cors.allowedOrigins:http://localhost,http://localhost:3000,https://romanticahq.com}") String allowedOrigins
    ) {
        this.allowedOrigins = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .collect(Collectors.toSet());
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (!requiresCsrfOriginCheck(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        String origin = request.getHeader("Origin");
        if (origin == null || origin.isBlank()) {
            origin = extractOriginFromReferer(request.getHeader("Referer"));
        }

        if (origin == null || !allowedOrigins.contains(origin)) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Invalid request origin.\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private static boolean requiresCsrfOriginCheck(HttpServletRequest request) {
        String method = request.getMethod();
        if (HttpMethod.GET.matches(method) || HttpMethod.HEAD.matches(method) || HttpMethod.OPTIONS.matches(method)) {
            return false;
        }
        String path = request.getRequestURI();
        return path != null && path.startsWith("/api/");
    }

    private static String extractOriginFromReferer(String referer) {
        if (referer == null || referer.isBlank()) return null;
        try {
            URI uri = URI.create(referer);
            if (uri.getScheme() == null || uri.getHost() == null) return null;
            if (uri.getPort() > 0) {
                return uri.getScheme() + "://" + uri.getHost() + ":" + uri.getPort();
            }
            return uri.getScheme() + "://" + uri.getHost();
        } catch (RuntimeException ex) {
            return null;
        }
    }
}

