package com.lcf.controller;

import com.lcf.constant.CodeType;
import com.lcf.service.ArticleService;
import com.lcf.service.TagService;
import com.lcf.utils.DataMap;
import com.lcf.utils.JsonResult;
import com.lcf.utils.StringUtil;
import com.lcf.utils.TransCodingUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: liuchuanfeng
 * @Date: 2020/7/16 21:27
 * Describe:
 */
@RestController
@Slf4j
public class TagsControl {

    @Autowired
    TagService tagService;
    @Autowired
    ArticleService articleService;

    /**
     * 分页获得该标签下的文章
     * @param tag
     * @return
     */
    @PostMapping(value = "/getTagArticle", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public String getTagArticle(@RequestParam("tag") String tag,
                                @RequestParam("rows") int rows,
                                @RequestParam("pageNum") int pageNum){
        try {
            if(tag.equals(StringUtil.BLANK)){
                return JsonResult.build(tagService.findTagsCloud()).toJSON();
            }

            tag = TransCodingUtil.unicodeToString(tag);
            DataMap data = articleService.findArticleByTag(tag, rows, pageNum);
            return JsonResult.build(data).toJSON();
        } catch (Exception e){
            log.error("Get tags exception", e);
        }
        return JsonResult.fail(CodeType.SERVER_EXCEPTION).toJSON();
    }

}
