package oauthhandson.api.authorize;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class GetAuthorizeController {

    @Value("${oauth.client_id}") String CLIENT_ID;

    @GetMapping("/authorize")
    ResponseEntity handleAuthorize(HttpServletRequest request) {
        var session = request.getSession();

        var state = UUID.randomUUID().toString();

        session.setAttribute("state", state);

        var url = String.format("https://github.com/login/oauth/authorize" +
                "?client_id=%s" +
                "&redirect_uri=http://localhost:8080/authorize/result&scope" +
                "=read:user&state=%s", CLIENT_ID, state);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Location", url);

        return new ResponseEntity(headers, HttpStatusCode.valueOf(307));
    }
}
