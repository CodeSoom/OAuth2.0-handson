package oauthhandson.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

@Service
public class GitHubService {
    @Value("${oauth.client_id}")
    String CLIENT_ID;
    @Value("${oauth.client_secret}")
    String CLIENT_SECRET;

    public String getToken(String code) {
        RestTemplate restTemplate = new RestTemplate();

        Request request = new Request(code, this.CLIENT_ID,
                this.CLIENT_SECRET);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        var list = new ArrayList<MediaType>();
        list.add(MediaType.APPLICATION_JSON);
        headers.setAccept(list);

        HttpEntity<Request> entity = new HttpEntity<>(request, headers);
        ResponseEntity<Response> response = restTemplate
                .postForEntity("https://github.com/login/oauth/access_token",
                        entity, Response.class);

        return response.getBody().getAccess_token();
    }

    class Request {
        private String code;
        private String client_id;
        private String client_secret;

        public Request(String code, String clientId, String clientSecret) {
            this.code = code;
            this.client_id = clientId;
            this.client_secret = clientSecret;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getClient_id() {
            return client_id;
        }

        public void setClient_id(String client_id) {
            this.client_id = client_id;
        }

        public String getClient_secret() {
            return client_secret;
        }

        public void setClient_secret(String client_secret) {
            this.client_secret = client_secret;
        }
    }

    public static class Response {
        private String access_token;

        public Response() {
        }

        void setAccess_token(String token) {
            this.access_token = token;
        }

        String getAccess_token() {
            return this.access_token;
        }
    }
}
