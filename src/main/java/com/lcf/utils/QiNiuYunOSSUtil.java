package com.lcf.utils;

import com.google.gson.Gson;

import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.Region;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;
import com.lcf.constant.OSSClientConstants;
import lombok.extern.slf4j.Slf4j;

import java.io.*;

/**
 * @description: 七牛云对象存储OSS工具类
 * @author: liuchuanfeng
 * @time: 2020/12/14 17:00
 */
@Slf4j
public class QiNiuYunOSSUtil {

    private static String ENDPOINT;

    private static String ACCESS_KEY_ID;

    private static String ACCESS_KEY_SECRET;

    private static String BACKET_NAME;

    private static String FOLDER;

    //初始化属性
    static{
        ENDPOINT = OSSClientConstants.ENDPOINT;
        ACCESS_KEY_ID = OSSClientConstants.ACCESS_KEY_ID;
        ACCESS_KEY_SECRET = OSSClientConstants.ACCESS_KEY_SECRET;
        BACKET_NAME = OSSClientConstants.BACKET_NAME;
        FOLDER = OSSClientConstants.FOLDER;
    }

    /**
     * 上传图片至OSS
     * @param file 上传文件（文件全路径如：D:\\image\\cake.jpg）
     * @param subCatalog 模拟文件夹名 如"img/"
     * @return String 文件名
     * */
    public static String uploadFile2OSS(File file,String subCatalog) {
        String resultStr = null;
        //构造一个带指定 Region 对象的配置类
        Configuration cfg = new Configuration(Region.region1());
        //...其他参数参考类注释
        UploadManager uploadManager = new UploadManager(cfg);
        //默认不指定key的情况下，以文件内容的hash值作为文件名
        String key = subCatalog + "/" + file.getName();
        log.info("qiniuyun key: [{}]",key);
        try {
           /* //以输入流的形式上传文件
            InputStream inputStream = new FileInputStream(file);*/
            Auth auth = Auth.create(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
            String upToken = auth.uploadToken(BACKET_NAME);
            try {
                log.info("qiniuyun upToken: [{}] , filePath: [{}] , fileSize: [{}]",upToken,file.getPath(),file.length());
                Response response = uploadManager.put(file,key,upToken);
                //解析上传成功的结果
                DefaultPutRet putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
                log.info("qiniuyun putRet.key: [{}]",putRet.key);
                resultStr = putRet.key;
            } catch (QiniuException ex) {
                Response r = ex.response;
                log.error(r.toString());
            }
        } catch (Exception ex) {
            log.error("qiniuyunoss uploadFile2OSS"+ex);
        }
        return resultStr;
    }

}
