package intern.backend.config;

import intern.backend.entity.User;
import intern.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class AdminSeeder {

    @Bean
    public CommandLineRunner seedAdmin(UserRepository userRepository) {

        return args -> {

            if (userRepository.findByEmail("admin@globalip.com").isEmpty()) {

                User admin = new User();

                admin.setUsername("Administrator");
                admin.setEmail("admin@globalip.com");
                admin.setPassword("Admin@123");
                admin.setRole("ADMIN");
                admin.setEnabled(true);
                admin.setCreatedAt(LocalDateTime.now());

                userRepository.save(admin);

                System.out.println("====================================");
                System.out.println("Admin account created successfully!");
                System.out.println("Email: admin@globalip.com");
                System.out.println("Password: Admin@123");
                System.out.println("====================================");
            }
        };
    }
}