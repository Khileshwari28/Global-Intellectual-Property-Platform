//package intern.backend.config;
//
//import intern.backend.entity.User;
//import intern.backend.service.OAuth2UserService;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//import java.util.Map;
//import java.util.UUID;
//import java.util.concurrent.ConcurrentHashMap;
//
//@Component
//public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//
//    @Autowired
//    private OAuth2UserService oAuth2UserService;
//
//    // Temporary storage for OAuth2 users (token -> user)
//    // In production, consider using Redis or a database
//    private static final Map<String, User> oauth2TokenStore = new ConcurrentHashMap<>();
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//                                        Authentication authentication) throws IOException, ServletException {
//
//        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
//
//        // Process OAuth2 user (auto-register if needed)
//        User user = oAuth2UserService.processOAuth2User(oauth2User);
//
//        // Generate temporary token
//        String token = UUID.randomUUID().toString();
//        oauth2TokenStore.put(token, user);
//
//        // Redirect to frontend callback page with token
//        String redirectUrl = "http://localhost:5173/oauth2/callback?token=" + token;
//
//        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
//    }
//
//    public static User getUserByToken(String token) {
//        return oauth2TokenStore.remove(token); // Remove after retrieval
//    }
//}
//
