package com.lcf.qq.connect;

import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionSignUp;
import org.springframework.stereotype.Component;

/**
 * @description: QQ登录获取userId
 * @author: liuchuanfeng
 * @time: 2020/12/25 13:12
 */
@Component
public class QQConnectionSignUp implements ConnectionSignUp {
    @Override
    public String execute(Connection<?> connection) {
        return connection.getDisplayName();
    }
}
