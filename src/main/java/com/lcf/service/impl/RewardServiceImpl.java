package com.lcf.service.impl;

import com.lcf.constant.CodeType;
import com.lcf.mapper.RewardMapper;
import com.lcf.model.Reward;
import com.lcf.service.RewardService;
import com.lcf.utils.DataMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author: liuchuanfeng
 * @Date: 2020/7/14 15:45
 * Describe:
 */
@Service
@Slf4j
public class RewardServiceImpl implements RewardService {

    @Autowired
    private RewardMapper rewardMapper;

    @Override
    public DataMap save(Reward reward) {
        rewardMapper.save(reward);
        return DataMap.success(CodeType.ADD_REWARD_SUCCESS)
                .setData(reward.getId());
    }

    @Override
    public DataMap getRewardInfo() {
        List<Reward> rewardList = rewardMapper.getAllReward();
        return DataMap.success().setData(rewardList);
    }

    @Override
    public DataMap deleteReward(int id) {
        rewardMapper.deleteRewardById(id);
        return DataMap.success(CodeType.DELETE_REWARD_SUCCESS);
    }
}
