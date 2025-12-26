package intern.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // ✅ Allow auth APIs
                        .requestMatchers("/api/users/register", "/api/users/login").permitAll()

                        // ✅ Allow IP search & details APIs
                        .requestMatchers("/api/ip/**").permitAll()

                        // ❌ Everything else secured
                        .anyRequest().authenticated()
                )
                .cors(cors -> {})
                .httpBasic(httpBasic -> httpBasic.disable()); // ❌ disable browser login popup

        return http.build();
    }
}
