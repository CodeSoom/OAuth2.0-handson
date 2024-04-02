package oauthhandson.app;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

@Service
public class UserService {
    static final String URL = "https://api.github.com/user";

    public String getProfile(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        var list = new ArrayList<MediaType>();
        list.add(MediaType.APPLICATION_JSON);
        headers.setAccept(list);

        HttpEntity entity = new HttpEntity<>(headers);
        ResponseEntity<Response> response = restTemplate.exchange(this.URL,
                HttpMethod.GET, entity, Response.class);

        return response.getBody().getAvatar_url();
    }

    public static class Response {
        private String avatarUrl;

        String getAvatar_url() {
            return this.avatarUrl;
        }

        void setAvatar_url(String url) {
            this.avatarUrl = url;
        }
    }
}
