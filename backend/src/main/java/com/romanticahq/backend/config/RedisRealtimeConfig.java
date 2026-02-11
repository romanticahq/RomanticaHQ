package com.romanticahq.backend.config;

import com.romanticahq.backend.chat.realtime.ChatRealtimePublisher;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

@Configuration
@ConditionalOnProperty(name = "app.realtime.redis.enabled", havingValue = "true")
public class RedisRealtimeConfig {

    @Bean
    public MessageListenerAdapter chatRealtimeMessageListenerAdapter(ChatRealtimePublisher publisher) {
        return new MessageListenerAdapter(publisher, "handleRedisEnvelope");
    }

    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer(
            RedisConnectionFactory connectionFactory,
            MessageListenerAdapter chatRealtimeMessageListenerAdapter,
            @Value("${app.realtime.redis.channel:rhq:chat:messages}") String channel
    ) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener(chatRealtimeMessageListenerAdapter, new ChannelTopic(channel));
        return container;
    }
}

