package com.lcf.service;

import com.lcf.model.Reward;
import com.lcf.utils.DataMap;

/**
 * @author: liuchuanfeng
 * @Date: 2020/7/14 15:44
 * Describe:
 */
public interface RewardService {

    DataMap save(Reward reward);
    /**
     * 获得所有的募捐记录
     * @return
     */
    DataMap getRewardInfo();

    /**
     * 通过id删除募捐记录
     */
    DataMap deleteReward(int id);
}
