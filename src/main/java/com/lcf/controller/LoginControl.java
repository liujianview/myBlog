package com.lcf.controller;

import com.lcf.constant.CodeType;
import com.lcf.model.User;
import com.lcf.redis.StringRedisServiceImpl;
import com.lcf.service.UserService;
import com.lcf.utils.JsonResult;
import com.lcf.utils.MD5Util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: liuchuanfeng
 * @Date: 2020/6/8 9:24
 * Describe: 登录控制
 */
@RestController
@Slf4j
public class LoginControl {

    @Autowired
    UserService userService;
    @Autowired
    StringRedisServiceImpl stringRedisService;

    @PostMapping(value = "/changePassword", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public String changePassword(@RequestParam("email") String email,
                                 @RequestParam("authCode") String authCode,
                                 @RequestParam("newPassword") String newPassword){

        try {
            String trueMsgCode = (String) stringRedisService.get(email);

            //判断获得的邮箱号是否是发送验证码的邮箱号
            if(trueMsgCode == null){
                return JsonResult.fail(CodeType.EMAIL_ERROR).toJSON();
            }
            //判断验证码是否正确
            if(!authCode.equals(trueMsgCode)){
                return JsonResult.fail(CodeType.AUTH_CODE_ERROR).toJSON();
            }
            User user = userService.findUserByEmail(email);
            if(user == null){
                return JsonResult.fail(CodeType.USERNAME_NOT_EXIST).toJSON();
            }
            MD5Util md5Util = new MD5Util();
            String mD5Password = md5Util.encode(newPassword);
            userService.updatePasswordByEmail(email, mD5Password);

            //修改密码成功删除redis中的验证码
            stringRedisService.remove(email);

            return JsonResult.success().toJSON();
        } catch (Exception e){
            log.error("[{}] change password [{}] exception", email, newPassword, e);
        }
        return JsonResult.fail(CodeType.SERVER_EXCEPTION).toJSON();
    }

}
