package com.example.WealthWave.authentication.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.client.OAuth2LoginConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.config.Customizer;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .exceptionHandling(customizer ->
                        customizer.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                )
                .sessionManagement(c ->
                        c.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(authorize -> authorize
//                        .requestMatchers("/", "/auth/**", "/public/**", "/api/auth/verify-token", "/api/expenses/**").permitAll() // Ensure your API endpoint is permitted
                        .anyRequest().permitAll()
                )
                .oauth2Login(AbstractHttpConfigurer::disable) // Disable OAuth2 login page redirection
                .formLogin(AbstractHttpConfigurer::disable); // Disable form login page redirection

        return http.build();
    }

//        http.csrf(AbstractHttpConfigurer::disable);
//        http.cors(AbstractHttpConfigurer::disable);
//
//        return http
//                .authorizeHttpRequests(request -> request
//                        .requestMatchers(HttpMethod.POST, "/api/auth/verify-token","/api/expenses").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/expenses/category/").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/api/expenses").permitAll()
//                        .anyRequest()
//                        .authenticated()
//                ).build();
//    }

//        http
//                .csrf(csrf -> csrf.disable()) // Disable CSRF protection
//                .cors(cors -> cors.disable()) // Disable CORS if it's managed globally or not needed
//                .authorizeHttpRequests(authz -> authz
//                .requestMatchers("/api/expenses/**").permitAll()  // Adjust as necessary
//                .anyRequest().authenticated()
//        )
//                // Configure session to be stateless; ideal for REST APIs
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//        // Include additional configurations like OAuth2Login if you're using OAuth2
//        return http.build();
//    }
}






