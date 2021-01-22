package com.lcf.service.impl;

import com.lcf.constant.CodeType;
import com.lcf.mapper.TagMapper;
import com.lcf.model.Tag;
import com.lcf.service.TagService;
import com.lcf.utils.DataMap;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: liuchuanfeng
 * @Date: 2020/7/16 19:50
 * Describe:
 */
@Service
public class TagServiceImpl implements TagService {

    @Autowired
    TagMapper tagMapper;

    @Override
    public void addTags(String[] tags, int tagSize) {
        for(String tag : tags){
            if(tagMapper.findIsExistByTagName(tag) == 0){
                Tag t = new Tag(tag, tagSize);
                tagMapper.save(t);
            }
        }
    }

    @Override
    public DataMap findTagsCloud() {
        List<Tag> tags = tagMapper.findTagsCloud();
        Map<String, Object> dataMap = new HashMap<>(2);
        dataMap.put("result",JSONArray.fromObject(tags));
        dataMap.put("tagsNum",tags.size());
        return DataMap.success(CodeType.FIND_TAGS_CLOUD).setData(dataMap);
    }

    @Override
    public int countTagsNum() {
        return tagMapper.countTagsNum();
    }

    @Override
    public int getTagsSizeByTagName(String tagName) {
        return tagMapper.getTagsSizeByTagName(tagName);
    }
}
