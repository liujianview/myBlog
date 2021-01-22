package com.lcf.model;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author: liuchuanfeng
 * @Date: 2020/6/20 15:36
 * Describe: 标签
 */
@Data
@NoArgsConstructor
public class Tag {

    private int id;

    /**
     * 标签名
     */
    private String tagName;

    /**
     * 标签大小
     */
    private int tagSize;

    public Tag(String tagName, int tagSize) {
        this.tagName = tagName;
        this.tagSize = tagSize;
    }
}
