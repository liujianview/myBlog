package com.lcf.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * @author: liuchuanfeng
 * @date: 2019/2/24 10:00
 * Descripe:
 */

@Mapper
@Repository
public interface QQMapper {

    /**
     * 根据qq昵称查找providerUserId
     * @param name
     * @return
     */
    @Select("select providerUserId from UserConnection where userId=#{name}")
    String getProviderIdByName(String name);

}
