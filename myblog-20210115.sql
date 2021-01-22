

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for archives
-- ----------------------------
DROP TABLE IF EXISTS `archives`;
CREATE TABLE `archives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `archiveName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of archives
-- ----------------------------
INSERT INTO `archives` VALUES ('4', '2020年12月');
INSERT INTO `archives` VALUES ('5', '2021年01月');

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` bigint(20) NOT NULL,
  `author` varchar(255) NOT NULL,
  `originalAuthor` varchar(255) NOT NULL,
  `articleTitle` varchar(255) NOT NULL,
  `articleContent` longtext NOT NULL,
  `articleTags` varchar(255) NOT NULL,
  `articleType` varchar(255) NOT NULL,
  `articleCategories` varchar(255) NOT NULL,
  `publishDate` varchar(255) NOT NULL,
  `updateDate` varchar(255) NOT NULL,
  `articleUrl` varchar(255) NOT NULL,
  `articleTabloid` text NOT NULL,
  `likes` int(11) NOT NULL,
  `lastArticleId` bigint(20) DEFAULT NULL,
  `nextArticleId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('26', '1608110285', '刘川枫', '刘川枫', '后来他乡即故乡', '\n\n2020-12-18 17:44:36 星期五\n\n\n\n\n\n\n\n后来奔忙，后来失望，后来他乡即故乡\n![](http://images.liujian.cool/blogArticles/2021-01-08/1610090515.jpeg)\n', '故乡,原创', '原创', '我的故事', '2020-12-16', '2021-01-08', 'http://liujian.cool/article/1608110285', '2020-12-1817&#58;44&#58;36星期五后来奔忙，后来失望，后来他乡即故乡...', '2', '0', '1610615321');
INSERT INTO `article` VALUES ('27', '1610615321', '刘川枫', '刘川枫', '【从零搭建个人博客】之搭建前感想', '## 1.写前感悟\n\n  自打工作以来，一直就想着搭建一个属于自己的个人博客网站，可以记录工作中遇到问题的解决办法，可以记录学习的一些新技术，亦可以记录自己工作生活中的随笔感悟等等。说了这么多，其实就是有了个人博客以后会感觉很牛，哈哈哈哈，一般大佬都有个人博客（优秀的人总是乐忠于分享）。之前在知乎上看过一条段子【程序猿也是可以有女朋友的】，看完后感触挺深，具体内容如下：\n\n> **标题：写博客对程序员很重要吗？**\n>\n>   之前开了公众号装逼写技术博客，更新了一段时间没人看就不写技术写一些情感、生活、旅游、吃喝玩乐的内容， 反正只要能写的就都写。\n>\n>   后来相亲认识了一妹子，没多久就好上了，主要是那妹纸太主动了，我没守住底线，沦陷了\n>\n>   问妹纸为什么主动追我，妹纸说:你的每篇文章我都看了，字里行间感受到了正能量，应该不是那种靠不住的男人，我年纪 也不小了，机会不容错过，于是就使了点套路。\n>\n>   我之前一直单身，始终找不好女朋友，对我有意思的我不喜欢，我喜欢的对我没感觉。现在能找到个令我满意的女朋友还没费多少 事我想应该有写博客一部分功劳吧。所以我觉得写博客对程序员来说挺重要的。		\n\n  好吧，重点不在于怎么找女朋友。作为一名程序猿，写博客是很好的一种体现，虽然我现在还是菜鸟一枚，但还是想分享些文章，不管有没有人看，坚持就好，也是一种态度。相信多年以后，你会感谢曾经的自己所付出的努力，最终你也会成为那个优秀的人。\n\n## 2.搭建个人博客的选择\n\n  在真正确定搭建本博客网站之前，搜索了很多关于搭建个人博客的方式和思路。譬如现在大部分个人博客网站用的 Wordpress和Hexo框架，这两款博客框架封装的很好，网上教程也很多，分分钟就能搭建好，主题也很多，非常适合新手搭建使用。\n\n  但我并没有直接选择，因为觉得自己动手搭建一个会更好，增长自己项目经验的同时又能随时DIY各种功能，亦可以在博客项目上实践一些没用过的技术，何乐而不为呢？但博主只是后端开发，简单的样式还能调一调，那些炫酷的样式主题还真做不来，就想着网上找一个不错的来进行二次开发。于是我在GitHub和码云上苦苦寻找了一番，终于找到了个不错的，前端页面的尽力修改，后端代码的简单重构以及功能增加，便形成了现在的这个博客，[点此进入我的个人博客](http://liujian.cool)  个人感觉还是不错的，以后还会陆续完善功能，增加使用体验。\n\n## 3.博客功能规划\n\n### 主要功能实现\n\n- 首页有最新文章排版，最新评论留言，每日一言，标签云，网站信息等等\n- 文章模块有文章分类，归档，标签等功能，支持点击进入相应文章，都支持评论留言\n- 友链支持一些大佬博客链接以及留言互相添加友联等功能\n- 更新模块主要记录网站更新的记录，支持留言\n- 照片墙模块根据日期展示博主后台上传自己喜欢的图片或游记照片等\n- 关于我模块主要介绍博主本身的经历和感悟等\n- 登录注册模块：支持QQ一键登录，可用邮箱注册账号登录本博客，忘记密码等\n- 个人用户模块：编辑个人资料修改密码，以及评论留言管理，支持悄悄话\n- 管理员后台模块：仪表盘展示网站访问信息，文章管理，点赞分类友链图片反馈悄悄话等功能管理\n\n  ps：目前实现了这些功能，后续文章也会着重介绍相关功能的实现，以及我在完善功能时遇到的一些坑和对应解决办法。\n\n## 4.博客页面展示\n\n### 博客首页展示\n\n![image-20210114163913709](http://images.liujian.cool/img/image-20210114163913709.png)\n\n### 个人主页展示\n\n![image-20210114164121694](http://images.liujian.cool/img/image-20210114164121694.png)\n\n### 博客后台管理展示\n\n![image-20210114164219881](http://images.liujian.cool/img/image-20210114164219881.png)\n\n## 5.总结\n\n  既然决心搭建博客网站了，就一定好好做，坚持更新，给自己一个目标吧，希望借此能养成认真记录的好习惯。\n\n  接下来会陆续更新搭建博客功能的教程，for example: 使用邮箱注册发送验证码，接入QQ登录，本地图片上传到\"七牛云OSS对象存储\"图床，增加每日一言功能，增加博客背景鼠标绘制多边形,点击出现爱心功能，增加阿里druid连接池监控功能，增加nginx反向代理，配置网站CDN加速等等功能，欢迎大家拍砖~\n\n  更多精彩功能请关注我的个人博客网站：[http://liujian.cool](http://liujian.cool)\n\n', '搭建博客系统,springboot框架,原创', '原创', '从零搭建个人博客', '2021-01-14', '2021-01-14', 'http://liujian.cool/article/1610615321', '1.写前感悟  自打工作以来，一直就想着搭建一个属于自己的个人博客网站，可以记录工作中遇到问题的解决办法，可以记录学习的一些新技术，亦可以记录自己工作生活中的随笔感悟等等。说了这么多，其实就是有了个人博客以后会感觉很牛，哈哈哈哈，一般大佬都有个人博客（优秀的人总是乐忠于分享）。之前在知乎上看过一条段子【程序猿也是可以有女朋友的】，看完后感触挺深，具体内容如下：标题：写博客对程序员很重要吗？ ...', '1', '1608110285', '0');

-- ----------------------------
-- Table structure for article_likes_record
-- ----------------------------
DROP TABLE IF EXISTS `article_likes_record`;
CREATE TABLE `article_likes_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` bigint(20) NOT NULL,
  `likerId` int(11) NOT NULL,
  `likeDate` varchar(255) NOT NULL,
  `isRead` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_likes_record
-- ----------------------------
INSERT INTO `article_likes_record` VALUES ('32', '1608110285', '1', '2020-12-17 16:48', '0');
INSERT INTO `article_likes_record` VALUES ('33', '1608110285', '20', '2021-01-04 22:42', '0');
INSERT INTO `article_likes_record` VALUES ('34', '1610615321', '20', '2021-01-15 00:08', '1');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('1', '我的故事');
INSERT INTO `categories` VALUES ('2', 'SpringBoot');
INSERT INTO `categories` VALUES ('9', '从零搭建个人博客');

-- ----------------------------
-- Table structure for comment_likes_record
-- ----------------------------
DROP TABLE IF EXISTS `comment_likes_record`;
CREATE TABLE `comment_likes_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` bigint(20) NOT NULL,
  `pId` int(11) NOT NULL,
  `likerId` int(11) NOT NULL,
  `likeDate` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment_likes_record
-- ----------------------------
-- ----------------------------
-- Table structure for comment_record
-- ----------------------------
DROP TABLE IF EXISTS `comment_record`;
CREATE TABLE `comment_record` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `pId` bigint(20) NOT NULL,
  `articleId` bigint(20) NOT NULL,
  `answererId` int(11) NOT NULL,
  `respondentId` int(11) NOT NULL,
  `commentDate` varchar(255) NOT NULL,
  `likes` int(255) NOT NULL,
  `commentContent` text NOT NULL,
  `isRead` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment_record
-- ----------------------------
-- ----------------------------
-- Table structure for daily_speech
-- ----------------------------
DROP TABLE IF EXISTS `daily_speech`;
CREATE TABLE `daily_speech` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `mood` varchar(20) NOT NULL,
  `picsUrl` text,
  `publishDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of daily_speech
-- ----------------------------

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feedbackContent` text NOT NULL,
  `contactInfo` varchar(255) DEFAULT NULL,
  `personId` int(11) NOT NULL,
  `feedbackDate` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of feedback
-- ----------------------------

-- ----------------------------
-- Table structure for friendlink
-- ----------------------------
DROP TABLE IF EXISTS `friendlink`;
CREATE TABLE `friendlink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `blogger` varchar(40) NOT NULL,
  `url` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of friendlink
-- ----------------------------

-- ----------------------------
-- Table structure for leave_message_likes_record
-- ----------------------------
DROP TABLE IF EXISTS `leave_message_likes_record`;
CREATE TABLE `leave_message_likes_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pageName` varchar(255) NOT NULL,
  `pId` int(11) NOT NULL,
  `likerId` int(11) NOT NULL,
  `likeDate` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of leave_message_likes_record
-- ----------------------------

-- ----------------------------
-- Table structure for leave_message_record
-- ----------------------------
DROP TABLE IF EXISTS `leave_message_record`;
CREATE TABLE `leave_message_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pageName` varchar(255) NOT NULL,
  `pId` int(255) NOT NULL,
  `answererId` int(11) NOT NULL,
  `respondentId` int(11) NOT NULL,
  `leaveMessageDate` varchar(255) NOT NULL,
  `likes` int(11) NOT NULL,
  `leaveMessageContent` text NOT NULL,
  `isRead` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of leave_message_record

-- ----------------------------
-- Table structure for pictures
-- ----------------------------
DROP TABLE IF EXISTS `pictures`;
CREATE TABLE `pictures` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `pictureName` varchar(255) NOT NULL COMMENT '图片名称',
  `pictureUrl` varchar(255) NOT NULL COMMENT '图片路径',
  `pictureDate` varchar(255) NOT NULL COMMENT '图片发布日期',
  `pictureDesc` varchar(255) DEFAULT NULL COMMENT '图片描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pictures
-- ----------------------------
INSERT INTO `pictures` VALUES ('3', 'dd', 'http://images.liujian.cool/pictureRecord/2021-01-04/1609763763.jpeg', '2020-12-28', '啦啦啦啦啦');
INSERT INTO `pictures` VALUES ('4', 'dd', 'http://images.liujian.cool/img/liuchuanfeng.jpg', '2020-12-28', '啦啦啦啦啦');
INSERT INTO `pictures` VALUES ('5', 'dd', 'http://images.liujian.cool/img/liuchuanfeng.jpg', '2020-12-28', '啦啦啦啦啦');
INSERT INTO `pictures` VALUES ('6', 'dd', 'http://images.liujian.cool/img/liuchuanfeng.jpg', '2020-12-28', '啦啦啦啦啦');
INSERT INTO `pictures` VALUES ('11', '大话西游', 'http://images.liujian.cool/pictureRecord/2021-01-07/1610005281.jpeg', '2021-01-07', '美');
INSERT INTO `pictures` VALUES ('12', '大话西游', 'http://images.liujian.cool/pictureRecord/2021-01-07/1610005281.jpeg', '2021-01-07', '美');
INSERT INTO `pictures` VALUES ('13', '大话西游', 'http://images.liujian.cool/pictureRecord/2021-01-07/1610005281.jpeg', '2021-01-07', '美');
INSERT INTO `pictures` VALUES ('14', '大话西游', 'http://images.liujian.cool/pictureRecord/2021-01-07/1610005281.jpeg', '2021-01-07', '美');
INSERT INTO `pictures` VALUES ('15', '大话西游', 'http://images.liujian.cool/pictureRecord/2021-01-07/1610005281.jpeg', '2021-01-07', '美');
INSERT INTO `pictures` VALUES ('16', '大话西游', 'http://images.liujian.cool/pictureRecord/2021-01-07/1610005281.jpeg', '2021-01-07', '美');
INSERT INTO `pictures` VALUES ('17', '大话西游', 'http://images.liujian.cool/pictureRecord/2021-01-07/1610005281.jpeg', '2021-01-07', '美');

-- ----------------------------
-- Table structure for pictures_archives
-- ----------------------------
DROP TABLE IF EXISTS `pictures_archives`;
CREATE TABLE `pictures_archives` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `pictureArchive` varchar(255) NOT NULL COMMENT '图片归档日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pictures_archives
-- ----------------------------
INSERT INTO `pictures_archives` VALUES ('1', '2020年12月');
INSERT INTO `pictures_archives` VALUES ('2', '2021年01月');

-- ----------------------------
-- Table structure for privateword
-- ----------------------------
DROP TABLE IF EXISTS `privateword`;
CREATE TABLE `privateword` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `privateWord` varchar(255) NOT NULL,
  `publisherId` varchar(255) NOT NULL,
  `replierId` varchar(255) DEFAULT NULL,
  `replyContent` varchar(255) DEFAULT NULL,
  `publisherDate` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of privateword
-- ----------------------------

-- ----------------------------
-- Table structure for reward
-- ----------------------------
DROP TABLE IF EXISTS `reward`;
CREATE TABLE `reward` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fundRaiser` varchar(30) NOT NULL,
  `fundRaisingSources` varchar(50) NOT NULL,
  `fundraisingPlace` varchar(50) NOT NULL,
  `rewardMoney` float NOT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  `rewardDate` datetime NOT NULL,
  `rewardUrl` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reward
-- ----------------------------
INSERT INTO `reward` VALUES ('4', '252', '公众号赞赏', '《1》', '25', '无', '2020-09-08 00:00:00', 'http://images.liujian.cool/null');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', 'ROLE_USER');
INSERT INTO `role` VALUES ('2', 'ROLE_ADMIN');
INSERT INTO `role` VALUES ('3', 'ROLE_SUPERADMIN');

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagName` varchar(255) NOT NULL,
  `tagSize` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('18', '原创', '20');
INSERT INTO `tags` VALUES ('26', '故乡', '20');
INSERT INTO `tags` VALUES ('27', '搭建博客系统', '20');
INSERT INTO `tags` VALUES ('28', 'springboot框架', '20');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` char(255) NOT NULL,
  `trueName` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `personalBrief` varchar(255) DEFAULT NULL,
  `avatarImgUrl` text NOT NULL,
  `recentlyLanded` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `User_id` int(11) NOT NULL,
  `Role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------


-- ----------------------------
-- Table structure for UserConnection
-- ----------------------------
DROP TABLE IF EXISTS `UserConnection`;
CREATE TABLE `UserConnection` (
  `userId` varchar(255) NOT NULL,
  `providerId` varchar(255) NOT NULL,
  `providerUserId` varchar(255) NOT NULL,
  `rank` int(11) NOT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `profileUrl` varchar(512) DEFAULT NULL,
  `imageUrl` varchar(512) DEFAULT NULL,
  `accessToken` varchar(512) NOT NULL,
  `secret` varchar(512) DEFAULT NULL,
  `refreshToken` varchar(512) DEFAULT NULL,
  `expireTime` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`userId`,`providerId`,`providerUserId`),
  UNIQUE KEY `UserConnectionRank` (`userId`,`providerId`,`rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of UserConnection
-- ----------------------------

-- ----------------------------
-- Table structure for visitor
-- ----------------------------
DROP TABLE IF EXISTS `visitor`;
CREATE TABLE `visitor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitorNum` bigint(20) NOT NULL,
  `pageName` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of visitor
-- ----------------------------
INSERT INTO `visitor` VALUES ('1', '999', 'totalVisitor');
INSERT INTO `visitor` VALUES ('2', '300', 'visitorVolume');
INSERT INTO `visitor` VALUES ('28', '145', 'article/1608110285');
INSERT INTO `visitor` VALUES ('29', '3', 'article/1610615321');
