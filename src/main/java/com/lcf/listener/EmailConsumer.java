package com.lcf.listener;

import com.lcf.controller.GetEmailCodeController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @description: 监听邮箱验证码
 * @author: LiuJian
 * @time: 2021/3/24 16:34
 */
@Component
@Slf4j
public class EmailConsumer {

    @Autowired
    private GetEmailCodeController getEmailCodeController;

    @RabbitListener(queues = {"emailQueue"})
    public void executeSendEmail(String message){
        log.info("executeSendEmail email: [{}]", message);
        getEmailCodeController.sendEmail(message);
    }

}
