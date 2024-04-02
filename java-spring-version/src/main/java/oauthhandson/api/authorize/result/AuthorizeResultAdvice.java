package oauthhandson.api.authorize.result;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthorizeResultAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(StateNotMatchException.class)
    String handleMissingAccessToken() {
        return "state가 일치하지 않습니다";
    }
}
