package com.example.WealthWave.authentication.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
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

//        http
//                .csrf(AbstractHttpConfigurer::disable)
//                .cors(Customizer.withDefaults())
//                .exceptionHandling(customizer ->
//                        customizer.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
//                )
//                .sessionManagement(c ->
//                        c.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                )
//                .authorizeHttpRequests(authorize -> authorize
//                        .requestMatchers("/", "/auth/**", "/public/**", "/api/auth/verify-token").permitAll() // Ensure your API endpoint is permitted
//                        .anyRequest().authenticated()
//                )
//                .oauth2Login(AbstractHttpConfigurer::disable) // Disable OAuth2 login page redirection
//                .formLogin(AbstractHttpConfigurer::disable); // Disable form login page redirection
//
//        return http.build();
//    }
        http.csrf(AbstractHttpConfigurer::disable);
        http.cors(AbstractHttpConfigurer::disable);

        return http
                .authorizeHttpRequests(request -> request
                        .requestMatchers(HttpMethod.POST, "/api/auth/verify-token").permitAll()
                        .anyRequest()
                        .authenticated()
                ).build();
    }
}





