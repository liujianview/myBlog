package com.lcf.utils;

/**
 * @description: 邮件生成验证码
 * @author: liuchuanfeng
 * @time: 2020/12/8 15:56
 */
public class EmailRandomUtil {

    public static String randomNumBuilder(){

        String result = "";
        for(int i=0;i<6;i++){
            result += Math.round(Math.random() * 9);
        }

        return result;

    }
}
