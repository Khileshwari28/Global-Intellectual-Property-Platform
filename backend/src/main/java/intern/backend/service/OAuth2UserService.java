//package intern.backend.service;
//
//import intern.backend.entity.User;
//import intern.backend.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//
//@Service
//public class OAuth2UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    public User processOAuth2User(OAuth2User oauth2User) {
//        String email = oauth2User.getAttribute("email");
//        String name = oauth2User.getAttribute("name");
//
//        if (email == null) {
//            throw new RuntimeException("Email not found in OAuth2 user attributes");
//        }
//
//        // Check if user already exists
//        return userRepository.findByEmail(email)
//                .orElseGet(() -> {
//                    // Auto-register new user
//                    User newUser = new User();
//                    newUser.setEmail(email);
//                    newUser.setUsername(name != null ? name : email.split("@")[0]);
//                    newUser.setPassword(""); // OAuth users don't have passwords
//                    newUser.setRole("USER");
//                    newUser.setCreatedAt(LocalDateTime.now());
//                    return userRepository.save(newUser);
//                });
//    }
//}
//
