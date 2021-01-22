package com.lcf.qq.connect;


import com.lcf.qq.service.QQ;
import org.springframework.social.connect.support.OAuth2ConnectionFactory;

/**
 * @description: QQ登录连接
 * @author: liuchuanfeng
 * @time: 2020/12/25 13:12
 */
public class QQConnectionFactory extends OAuth2ConnectionFactory<QQ> {

    public QQConnectionFactory(String providerId, String appId, String appSecret){
        super(providerId,new QQServiceProvider(appId,appSecret),new QQAdapter());
    }
}
