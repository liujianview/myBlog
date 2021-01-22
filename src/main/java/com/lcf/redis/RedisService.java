package com.lcf.redis;

/**
 * @author: liuchuanfeng
 * @Date: 2020/5/14 15:31
 * Describe:
 */
public interface RedisService {

    /**
     * 判断key是否存在
     */
    Boolean hasKey(String key);

}
