package com.taskmanager.reactiveservice.publisher;

import com.taskmanager.reactiveservice.event.TaskEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.util.ReflectionUtils;
import reactor.core.publisher.FluxSink;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executor;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.function.Consumer;

public class TaskPublisher implements ApplicationListener<TaskEvent>, Consumer<FluxSink<TaskEvent>> {

    private final Executor executor;
    private final BlockingQueue<TaskEvent> queue = new LinkedBlockingQueue<>();

    public TaskPublisher(Executor executor) {
        this.executor = executor;
    }

    @Override
    public void accept(FluxSink<TaskEvent> sink) {
        this.executor.execute(() -> {
            while (true)
                try {
                    sink.next(queue.take());
                }
                catch (InterruptedException e) {
                    ReflectionUtils.rethrowRuntimeException(e);
                }
        });
    }

    @Override
    public void onApplicationEvent(TaskEvent event) {
        this.queue.offer(event);
    }
}
