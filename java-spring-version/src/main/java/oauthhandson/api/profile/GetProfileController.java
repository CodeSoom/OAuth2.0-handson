package oauthhandson.api.profile;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import oauthhandson.app.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class GetProfileController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    Response handleGetProfile(HttpServletRequest request) {
        HttpSession session = request.getSession();

        var token = session.getAttribute("accessToken");
        if (token == null) {
            throw new MissingAccessTokenException();
        }

        var profile = this.userService.getProfile((String) token);
        return new Response(profile);
    }

     class Response {
        public String profile;

        public Response(String profile) {
            this.profile = profile;
        }
    }
}
