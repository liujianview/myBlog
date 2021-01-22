package com.lcf.service;

import com.lcf.model.FriendLink;
import com.lcf.utils.DataMap;

/**
 * @author: liuchuanfeng
 * @Date: 2020/5/16 17:08
 * Describe:
 */
public interface FriendLinkService {

    DataMap addFriendLink(FriendLink friendLink);

    DataMap getAllFriendLink();

    DataMap updateFriendLink(FriendLink friendLink, int id);

    DataMap deleteFriendLink(int id);

    DataMap getFriendLink();
}
