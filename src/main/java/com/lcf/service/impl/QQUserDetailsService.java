package com.lcf.service.impl;


import com.lcf.mapper.QQMapper;
import com.lcf.mapper.UserMapper;
import com.lcf.model.Role;
import com.lcf.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.social.security.SocialUser;
import org.springframework.social.security.SocialUserDetails;
import org.springframework.social.security.SocialUserDetailsService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @description: 将第三方登录信息存入social
 * @author: liuchuanfeng
 * @time: 2020/12/30 13:15
 */
@Component
public class QQUserDetailsService implements SocialUserDetailsService {


    @Autowired
    QQMapper qqMapper;

    @Autowired
    UserMapper userMapper;

    @Override
    public SocialUserDetails loadUserByUserId(String s) throws UsernameNotFoundException {
        return buildUser(s);
    }


    private SocialUser buildUser(String userId) {
        // 根据用户名查找用户信息
        //根据查找到的用户信息判断用户是否被冻结
        String email = qqMapper.getProviderIdByName(userId);
        User user = userMapper.getUsernameAndRolesByEmail(email);
        String password = "";
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        for(Role role : user.getRoles()){
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return new SocialUser(user.getUsername(), password,
                true, true, true, true,
                authorities);
    }
}
