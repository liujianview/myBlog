package com.lcf.qq.config;

import org.springframework.social.security.SocialAuthenticationFilter;
import org.springframework.social.security.SpringSocialConfigurer;


/**
 * @description: QQ登录Spring Social配置
 * @author: liuchuanfeng
 * @time: 2020/12/25 13:12
 */
public class QQSpringSocialConfigurer extends SpringSocialConfigurer {

    private String filterProcessesUrl;

    public QQSpringSocialConfigurer(String filterProcessesUrl){
        this.filterProcessesUrl = filterProcessesUrl;
    }

    @Override
    protected <T> T postProcess(T object) {
        SocialAuthenticationFilter filter = (SocialAuthenticationFilter) super.postProcess(object);
        filter.setFilterProcessesUrl(filterProcessesUrl);
        filter.setSignupUrl("/");
        return (T) filter;
    }
}
