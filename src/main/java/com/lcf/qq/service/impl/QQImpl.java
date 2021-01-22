package com.lcf.qq.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lcf.constant.RoleConstant;
import com.lcf.mapper.UserMapper;
import com.lcf.model.QQUser;
import com.lcf.model.User;
import com.lcf.qq.service.QQ;
import com.lcf.utils.SpringUtils;
import com.lcf.utils.TimeUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.oauth2.AbstractOAuth2ApiBinding;
import org.springframework.social.oauth2.TokenStrategy;

import java.io.IOException;

/**
 * @description: QQ登录获取用户信息实现类
 * @author: liuchuanfeng
 * @time: 2020/12/25 13:12
 */
public class QQImpl extends AbstractOAuth2ApiBinding implements QQ {

    private static final String QQ_URL_GET_OPENID = "https://graph.qq.com/oauth2.0/me?access_token=%s";
    private static final String QQ_URL_GET_USER_INFO = "https://graph.qq.com/user/get_user_info?oauth_consumer_key=%s&openid=%s";

    private String appId;
    private String openId;

    UserMapper userMapper = SpringUtils.getApplicationContext().getBean(UserMapper.class);

    private ObjectMapper objectMapper = new ObjectMapper();
    User user = new User();

    public QQImpl(String accessToken,String appId){
        super(accessToken, TokenStrategy.ACCESS_TOKEN_PARAMETER);
        this.appId = appId;

        String url = String.format(QQ_URL_GET_OPENID, accessToken);
        String result = getRestTemplate().getForObject(url, String.class);

        this.openId = StringUtils.substringBetween(result, "\"openid\":\"", "\"}");
    }

    @Override
    public QQUser getUserInfo() {
        String url = String.format(QQ_URL_GET_USER_INFO, appId, openId);
        String result = getRestTemplate().getForObject(url, String.class);
        QQUser userInfo = null;
        try {
            userInfo = objectMapper.readValue(result, QQUser.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        userInfo.setOpenId(openId);
        user.setEmail(openId);
        TimeUtil timeUtil = new TimeUtil();
        user.setRecentlyLanded(timeUtil.getFormatDateForSix());
        //判断用户是否存在
        String email = openId;
        if(userMapper.findUserByEmail(email) == null){
            String gender = userInfo.getGender().equals("男")?"male":"female";
            user.setUsername(userInfo.getNickname());
            user.setPassword("");
            user.setGender(gender);
            user.setAvatarImgUrl(userInfo.getFigureurl_qq_2());
            userMapper.save(user);
            //添加用户权限
            int userId = userMapper.findUserIdByEmail(user.getEmail());
            userMapper.saveRole(userId, RoleConstant.ROLE_USER);
        }
        userMapper.updateRecentlyLanded(user.getEmail(),user.getRecentlyLanded());
        return userInfo;
    }


}
