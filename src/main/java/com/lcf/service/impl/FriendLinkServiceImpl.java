package com.lcf.service.impl;

import com.lcf.constant.CodeType;
import com.lcf.mapper.FriendLinkMapper;
import com.lcf.model.FriendLink;
import com.lcf.service.FriendLinkService;
import com.lcf.utils.DataMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author: liuchuanfeng
 * @Date: 2020/5/16 17:09
 * Describe:
 */
@Service
@Slf4j
public class FriendLinkServiceImpl implements FriendLinkService {

    @Autowired
    FriendLinkMapper friendLinkMapper;

    @Override
    public DataMap addFriendLink(FriendLink friendLink) {
        int id = friendLinkMapper.findIsExistByBlogger(friendLink.getBlogger());
        if(id == 0){
            friendLinkMapper.save(friendLink);
            return DataMap.success(CodeType.ADD_FRIEND_LINK_SUCCESS)
                    .setData(friendLink.getId());
        } else {
            return DataMap.fail(CodeType.FRIEND_LINK_EXIST);
        }
    }

    @Override
    public DataMap getAllFriendLink() {
        List<FriendLink> links = friendLinkMapper.getAllFriendLink();
        return DataMap.success().setData(links);
    }

    @Override
    public DataMap updateFriendLink(FriendLink friendLink, int id) {
        friendLinkMapper.updateFriendLink(friendLink, id);
        return DataMap.success(CodeType.UPDATE_FRIEND_LINK_SUCCESS);
    }

    @Override
    public DataMap deleteFriendLink(int id) {
        friendLinkMapper.deleteFriendLinkById(id);
        return DataMap.success(CodeType.DELETE_FRIEND_LINK_SUCCESS);
    }

    @Override
    public DataMap getFriendLink() {
        List<FriendLink> links = friendLinkMapper.getAllFriendLink();
        return DataMap.success().setData(links);
    }
}
