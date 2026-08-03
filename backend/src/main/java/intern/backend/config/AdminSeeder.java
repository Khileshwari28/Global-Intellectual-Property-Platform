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

            System.out.println("===== ADMIN SEEDER STARTED =====");

            boolean exists = userRepository.findByEmail("admin@globalip.com").isPresent();

            System.out.println("Admin exists: " + exists);

            if (!exists) {

                User admin = new User();

                admin.setUsername("Administrator");
                admin.setEmail("admin@globalip.com");
                admin.setPassword("Admin@123");
                admin.setRole("ADMIN");
                admin.setEnabled(true);
                admin.setCreatedAt(LocalDateTime.now());

                userRepository.save(admin);

                System.out.println("===== ADMIN CREATED =====");
            }
        };
    }
}