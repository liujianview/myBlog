package com.lcf.service;

import com.lcf.model.DailySpeech;
import com.lcf.utils.DataMap;

/**
 * @author: liuchuanfeng
 * @Date: 2020/11/28 15:33
 * Describe: 藏心阁-今日
 */
public interface TodayService {

    DataMap publishISay(DailySpeech dailySpeech);

    DataMap getTodayInfo(int rows, int pageNum);

}
