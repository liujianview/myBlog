package com.lcf.model;

import lombok.Data;

/**
 * @description: 照片实体
 * @author: liuchuanfeng
 * @time: 2020/12/28 17:51
 */
@Data
public class Picture {

    /**
     * 主键id
     */
    private int id;

    /**
     * 图片名称
     */
    private String pictureName;

    /**
     * 图片路径
     */
    private String pictureUrl;

    /**
     * 图片发布日期
     */
    private String pictureDate;

    /**
     * 图片描述
     */
    private String pictureDesc;

}
