package com.taskmanager.reactiveservice.publisher;

import com.taskmanager.reactiveservice.event.UserEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;
import reactor.core.publisher.FluxSink;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executor;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.function.Consumer;

@Component
public class UserPublisher implements ApplicationListener<UserEvent>, Consumer<FluxSink<UserEvent>> {

    private final Executor executor;
    private final BlockingQueue<UserEvent> queue = new LinkedBlockingQueue<>();

    public UserPublisher(Executor executor) {
        this.executor = executor;
    }

    @Override
    public void accept(FluxSink<UserEvent> sink) {
        this.executor.execute(() -> {
            while (true){
                try {
                    sink.next(queue.take());
                } catch (InterruptedException e) {
                    ReflectionUtils.rethrowRuntimeException(e);
                }
            }
        });
    }

    @Override
    public void onApplicationEvent(UserEvent userEvent) {
        this.queue.offer(userEvent);
    }
}
