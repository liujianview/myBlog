package com.lcf.controller;

import com.lcf.constant.CodeType;
import com.lcf.service.ArchiveService;
import com.lcf.service.ArticleService;
import com.lcf.service.PictureService;
import com.lcf.service.RewardService;
import com.lcf.utils.DataMap;
import com.lcf.utils.JsonResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @description: 照片墙处理
 * @author: liuchuanfeng
 * @time: 2020/12/28 17:25
 */
@RestController
@Slf4j
public class PicturesController {

    @Autowired
    PictureService pictureService;
    @Autowired
    ArticleService articleService;

    /**
     * 获得所有照片日期以及每个日期的照片数目
     * @return
     */
    @GetMapping(value = "/findPictureDateAndNumber", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public String findPictureDateAndNumber(){
        try {
            DataMap data = pictureService.findPictureDateAndNumber();
            return JsonResult.build(data).toJSON();
        } catch (Exception e){
            log.error("findPictureDateAndNumber exception", e);
        }
        return JsonResult.fail(CodeType.SERVER_EXCEPTION).toJSON();
    }


    /**
     * 分页获得该日期下的照片
     */
    @GetMapping(value = "/getPicturesByPage", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public String getPicturesByPage(@RequestParam("pictureDate") String pictureDate,
                                        @RequestParam("rows") int rows,
                                        @RequestParam("pageNum") int pageNum){
        try {
            DataMap data = pictureService.findPicturesByPictureDate(pictureDate, rows, pageNum);
            return JsonResult.build(data).toJSON();
        } catch (Exception e){
            log.error("getPicturesByPage [{}] exception", pictureDate, e);
        }
        return JsonResult.fail(CodeType.SERVER_EXCEPTION).toJSON();
    }

    /**
     * 获得所有照片信息
     */
    @PostMapping(value = "/getPictureInfo", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public String getPictureInfo(){
        try {
            DataMap data = pictureService.getPictureInfo();
            return JsonResult.build(data).toJSON();
        } catch (Exception e){
            log.error("getPictureInfo exception", e);
        }
        return JsonResult.fail(CodeType.SERVER_EXCEPTION).toJSON();
    }
}
