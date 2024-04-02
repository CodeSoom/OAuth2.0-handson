package oauthhandson.api.profile;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GetProfileAdvice {

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(MissingAccessTokenException.class)
    String handleMissingAccessToken() {
        return "접근 권한 토큰이 없습니다";
    }
}
