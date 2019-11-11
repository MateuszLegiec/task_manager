package com.taskmanager.reactiveservice.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskmanager.reactiveservice.event.UserEvent;
import com.taskmanager.reactiveservice.publisher.UserPublisher;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import reactor.core.publisher.Flux;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Slf4j
@Configuration
public class WebSocketConfig {

    @Bean
    Executor executor() {
        return Executors.newSingleThreadExecutor();
    }

//    @Bean
//    WebSocketHandlerAdapter webSocketHandlerAdapter() {
//        return new WebSocketHandlerAdapter();
//    }
////
//    @Bean
//    WebSocketHandler webSocketHandler(ObjectMapper objectMapper, UserPublisher eventPublisher)
//    {
//        Flux<UserEvent> publish = Flux
//                .create(eventPublisher)
//                .share();
//
//        return session -> {
//
//            Flux<WebSocketMessage> messageFlux = publish
//                    .map(evt -> {
//                        try {
//                            return objectMapper.writeValueAsString(evt.getSource());
//                        }
//                        catch (JsonProcessingException e) {
//                            throw new RuntimeException(e);
//                        }
//                    })
//                    .map(str -> {
//                        log.info("sending " + str);
//                        return session.textMessage(str);
//                    });
//
//            return session.send(messageFlux);
//        };
//    }
}
