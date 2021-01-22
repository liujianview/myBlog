package com.lcf.qq.connect;


import com.lcf.qq.service.QQ;
import com.lcf.qq.service.impl.QQImpl;
import org.springframework.social.oauth2.AbstractOAuth2ServiceProvider;

/**
 * @description: QQ登录服务提供
 * @author: liuchuanfeng
 * @time: 2020/12/25 13:12
 */
public class QQServiceProvider extends AbstractOAuth2ServiceProvider<QQ> {

    private static final String QQ_URL_AUTHORIZE = "https://graph.qq.com/oauth2.0/authorize";
    private static final String QQ_URL_ACCESS_TOKEN = "https://graph.qq.com/oauth2.0/token";
    private String appId;

    public QQServiceProvider(String appId, String appSecret){
        super(new QQAuth2Template(appId, appSecret, QQ_URL_AUTHORIZE, QQ_URL_ACCESS_TOKEN));
        this.appId = appId;
    }


    @Override
    public QQ getApi(String accessToken) {
        return new QQImpl(accessToken,appId);
    }
}
