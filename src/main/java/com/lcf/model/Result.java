package com.lcf.model;

import lombok.Data;

/**
 * @author: liuchuanfeng
 * @Date: 2020/5/18 17:15
 * Describe: 返回统一的响应格式
 */
@Data
public class Result<T> {

    /**
     * 错误码
     */
    private Integer code;

    /**
     * 提示信息
     */
    private String msg;

    /**
     * 具体内容
     */
    private  T data;

}
