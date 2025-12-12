package intern.backend;

import intern.backend.User;
import intern.backend.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")   // allow React
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public Object loginUser(@RequestBody User user) {

        System.out.println("Login attempt:");
        System.out.println("Email from frontend: " + user.getEmail());
        System.out.println("Password from frontend: " + user.getPassword());

        return userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword())
                .<Object>map(u -> {
                    System.out.println("MATCH FOUND!");
                    return u;
                })
                .orElseGet(() -> {
                    System.out.println("NO MATCH FOUND IN DB");
                    return "Invalid email or password";
                });
    }

}
