package com.lcf.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @description: Rabbitmq配置队列
 * @author: LiuJian
 * @time: 2021/3/25 10:59
 */
@Configuration
public class RabbitmqConfig {

    //队列
    public static final String EMAIL_QUEUE = "emailQueue";
    //交换机
    public static final String EXCHANGE_TOPIC_NAME = "testChange";

    //#路由规则 匹配 email后面 所有的键
    public static final String QUEUE_BING_ROUTINGKEY="email.#";
    //# 提供者发送消息指定的 路由键(邮件)
    public static final String PRODUCER_ROUTINGKEY="email.bar.test";


    //声明队列
    @Bean(EMAIL_QUEUE)
    public Queue QUEUE_NEWS(){
        return new Queue(EMAIL_QUEUE);
    }

    //声明交换机
    @Bean(EXCHANGE_TOPIC_NAME)
    public Exchange EXCHANGE_TOPIC_INFORM(){
        //声明了一个Topic类型的交换机，durable是持久化（重启rabbitmq这个交换机不会被自动删除）
        return ExchangeBuilder.topicExchange(EXCHANGE_TOPIC_NAME).durable(true).build();
    }

    //声明EMAIL_QUEUE队列和交换机绑定关系，并且指定RoutingKey
    @Bean
    public Binding NEWS_BINDING_TOPIC(@Qualifier(EMAIL_QUEUE) Queue queue,
                                      @Qualifier(EXCHANGE_TOPIC_NAME) Exchange exchange){
        return BindingBuilder.bind(queue).to(exchange).with(QUEUE_BING_ROUTINGKEY).noargs();
    }

    @Bean
    public MessageConverter messageConverter(){
        return new Jackson2JsonMessageConverter();
    }
}
