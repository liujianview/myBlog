package com.lcf.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lcf.component.StringAndArray;
import com.lcf.constant.CodeType;
import com.lcf.mapper.PictureMapper;
import com.lcf.model.Article;
import com.lcf.model.Picture;
import com.lcf.model.Reward;
import com.lcf.service.PictureService;
import com.lcf.utils.DataMap;
import com.lcf.utils.StringUtil;
import com.lcf.utils.TimeUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @description: 照片墙处理实现类
 * @author: liuchuanfeng
 * @time: 2020/12/28 18:02
 */
@Service
public class PictureServiceImpl implements PictureService {

    @Autowired
    PictureMapper pictureMapper;

    /**
     * @description: 获得照片墙日期和数目
     * @return: com.lcf.utils.DataMap
     * @author: liuchuanfeng
     * @time: 2020/12/28 18:03
     */
    @Override
    public DataMap findPictureDateAndNumber() {
        List<String> pictureArchive = pictureMapper.findPictures();
        JSONArray archivesJsonArray = new JSONArray();
        JSONObject archiveJson;
        TimeUtil timeUtil = new TimeUtil();
        for(String pictureArchiveName : pictureArchive){
            archiveJson = new JSONObject();
            archiveJson.put("pictureArchiveName",pictureArchiveName);
            pictureArchiveName = timeUtil.timeYearToWhippletree(pictureArchiveName);
            archiveJson.put("pcitureNum",pictureMapper.countPictureNum(pictureArchiveName));
            archivesJsonArray.add(archiveJson);
        }
        JSONObject returnJson = new JSONObject();
        returnJson.put("result", archivesJsonArray);
        return DataMap.success().setData(returnJson);
    }

    /**
     * @description: 分页获得该归档日期下的所有照片
     * @param pictureDate
     * @param rows
     * @param pageNum
     * @return: com.lcf.utils.DataMap
     * @author: liuchuanfeng
     * @time: 2020/12/28 19:40
     */
    @Override
    public DataMap findPicturesByPictureDate(String pictureDate, int rows, int pageNum) {
        List<Picture> pictures;
        PageInfo<Picture> pageInfo;
        JSONArray pictureJsonArray = new JSONArray();
        TimeUtil timeUtil = new TimeUtil();
        String showMonth = "hide";
        if(!StringUtil.BLANK.equals(pictureDate)){
            pictureDate = timeUtil.timeYearToWhippletree(pictureDate);
        }
        PageHelper.startPage(pageNum, rows);
        if(StringUtil.BLANK.equals(pictureDate)){
            pictures = pictureMapper.findAllPicturesInfo();
        } else {
            pictures = pictureMapper.findPicturesByPictureDate(pictureDate);
            showMonth = "show";
        }
        pageInfo = new PageInfo<>(pictures);

        pictureJsonArray = timeLineReturn(pictureJsonArray, pictures);

        JSONObject pageJson = new JSONObject();
        pageJson.put("pageNum",pageInfo.getPageNum());
        pageJson.put("pageSize",pageInfo.getPageSize());
        pageJson.put("total",pageInfo.getTotal());
        pageJson.put("pages",pageInfo.getPages());
        pageJson.put("isFirstPage",pageInfo.isIsFirstPage());
        pageJson.put("isLastPage",pageInfo.isIsLastPage());

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("result",pictureJsonArray);
        jsonObject.put("pageInfo",pageJson);
        jsonObject.put("pictureNum", pictureMapper.countPictures());
        jsonObject.put("showMonth", showMonth);

        return DataMap.success().setData(jsonObject);
    }

    @Override
    public DataMap save(Picture picture) {
        pictureMapper.save(picture);
        return DataMap.success(CodeType.ADD_PICTURE_SUCCESS)
                .setData(picture);
    }

    @Override
    public DataMap updatePicture(Picture picture) {
        pictureMapper.updatePicture(picture);
        return DataMap.success(CodeType.UPDATE_PICTURE_SUCCESS)
                .setData(picture);
    }

    /**
     * @description: 获得所有照片信息
     * @author: liuchuanfeng
     * @time: 2020/12/29 13:36
     */
    @Override
    public DataMap getPictureInfo() {
        List<Picture> pictureList = pictureMapper.getAllPicture();
        return DataMap.success().setData(pictureList);
    }

    @Override
    public DataMap deletePicture(int id) {
        pictureMapper.deletePictureById(id);
        return DataMap.success(CodeType.DELETE_PICTURE_SUCCESS);
    }

    @Override
    public void addPictureArchive(String pictureArchive) {
        int pictureArchiveIsExist = pictureMapper.findPictureArchive(pictureArchive);
        if(pictureArchiveIsExist == 0){
            pictureMapper.savePictureArchive(pictureArchive);
        }
    }

    /**
     * 封装时间线中数据成JsonArray形式
     */
    private JSONArray timeLineReturn(JSONArray pictureJsonArray, List<Picture> pictures){
        JSONObject pictureJson;
        for(Picture picture : pictures){
            pictureJson = new JSONObject();
            pictureJson.put("pictureName", picture.getPictureName());
            pictureJson.put("pictureUrl", picture.getPictureUrl());
            pictureJson.put("pictureDate", picture.getPictureDate());
            pictureJson.put("pictureDesc", picture.getPictureDesc());
            pictureJsonArray.add(pictureJson);
        }
        return pictureJsonArray;
    }
}
