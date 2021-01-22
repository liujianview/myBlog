package com.lcf.service;

import com.lcf.model.Picture;
import com.lcf.model.Reward;
import com.lcf.utils.DataMap;

/**
 * @description: 照片墙service
 * @author: liuchuanfeng
 * @time: 2020/12/28 17:59
 */
public interface PictureService {

    /**
     * 获得照片墙日期和数目
     * @return
     */
    DataMap findPictureDateAndNumber();

    /**
     * 分页获得该归档日期下的所有照片
     * @param pictureDate 归档日期
     * @param rows 一页大小
     * @param pageNum 页数
     * @return
     */
    DataMap findPicturesByPictureDate(String pictureDate, int rows, int pageNum);

    /**
     * 添加照片
     */
    DataMap save(Picture picture);

    /**
     * 修改照片
     */
    DataMap updatePicture(Picture picture);

    /**
     * 获得所有的照片信息
     */
    DataMap getPictureInfo();

    /**
     * 通过id删除照片
     */
    DataMap deletePicture(int id);

    /**
     * 添加照片归档日期
     */
    void addPictureArchive(String archiveName);

}
