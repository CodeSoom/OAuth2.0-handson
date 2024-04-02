package oauthhandson.api.authorize.result;

import jakarta.servlet.http.HttpServletRequest;
import oauthhandson.app.GitHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthorizeResultController {

    @Autowired
    private GitHubService gitHubService;

    @GetMapping("/authorize/result")
    ResponseEntity handleAuthorizeResult(
            HttpServletRequest request,
            @RequestParam String code,
            @RequestParam String state
    ) {
        var session = request.getSession();

        if (state == null || !state.equals(session.getAttribute("state"))) {
            throw new StateNotMatchException();
        }

        var token = gitHubService.getToken(code);
        session.setAttribute("accessToken", token);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Location", "http://localhost:3000");

        return new ResponseEntity(headers, HttpStatusCode.valueOf(307));
    }
}
