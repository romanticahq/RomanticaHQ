package com.romanticahq.backend.security;

import jakarta.servlet.FilterChain;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CsrfOriginFilterTest {

    @Test
    void blocksStateChangingRequestFromUnknownOrigin() throws Exception {
        CsrfOriginFilter filter = new CsrfOriginFilter("https://romanticahq.com,http://localhost:3000");
        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/api/profile/me");
        request.addHeader("Origin", "https://evil.example");
        MockHttpServletResponse response = new MockHttpServletResponse();

        FilterChain chain = (req, res) -> ((MockHttpServletResponse) res).setStatus(204);
        filter.doFilter(request, response, chain);

        assertEquals(403, response.getStatus());
    }

    @Test
    void allowsStateChangingRequestFromAllowedOrigin() throws Exception {
        CsrfOriginFilter filter = new CsrfOriginFilter("https://romanticahq.com,http://localhost:3000");
        MockHttpServletRequest request = new MockHttpServletRequest("PUT", "/api/profile/me");
        request.addHeader("Origin", "https://romanticahq.com");
        MockHttpServletResponse response = new MockHttpServletResponse();

        FilterChain chain = (req, res) -> ((MockHttpServletResponse) res).setStatus(204);
        filter.doFilter(request, response, chain);

        assertEquals(204, response.getStatus());
    }
}

