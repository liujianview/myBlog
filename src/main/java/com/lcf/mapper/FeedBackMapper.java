package com.lcf.mapper;

import com.lcf.model.FeedBack;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author: liuchuanfeng
 * @Date: 2020/7/23 17:22
 * Describe: 反馈sql
 */
@Mapper
@Repository
public interface FeedBackMapper {

    @Insert("insert into feedback(feedbackContent,contactInfo,personId,feedbackDate) values(#{feedbackContent},#{contactInfo},#{personId},#{feedbackDate})")
    void save(FeedBack feedBack);

    @Select("select * from feedback order by id desc")
    List<FeedBack> getAllFeedback();

}
