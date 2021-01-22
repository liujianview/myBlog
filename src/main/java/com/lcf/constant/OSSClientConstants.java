package com.lcf.constant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author: liuchuanfeng
 * @Date: 2020/6/9 19:45
 * Describe: 七牛云连接密钥
 */
@Component
public class OSSClientConstants {

    /**
     * 七牛云API的外网域名
     */
    public static final String ENDPOINT = "images.liujian.cool";

    /**
     * 七牛云API的密钥Access Key ID
     */
    public static String ACCESS_KEY_ID;
    /**
     *七牛云API的密钥Access Key Secret
     */
    public static String ACCESS_KEY_SECRET;

    /**
     * 七牛云API的bucket名称
     * 在七牛云上自己创建一个bucket
     */
    public static final String BACKET_NAME = "lcf-myblog-imgs";

    /**
     * 七牛云API的文件夹名称
     * 在七牛云上自己创建一个文件夹，方便分类管理图片
     */
    public static final String FOLDER="img/";

    @Value("${qiniuyun.accessKeyId}")
    public void setAccessKeyId(String accessKeyId) {
        ACCESS_KEY_ID = accessKeyId;
    }

    @Value("${qiniuyun.secret}")
    public void setAccessKeySecret(String accessKeySecret) {
        ACCESS_KEY_SECRET = accessKeySecret;
    }
}
