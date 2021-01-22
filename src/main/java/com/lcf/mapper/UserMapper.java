package com.lcf.mapper;

import com.lcf.model.Role;
import com.lcf.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author: liuchuanfeng
 * @Date: 2020/6/4 15:52
 * Describe: user表SQL语句
 */
@Mapper
@Repository
public interface UserMapper {

    @Select("select * from user where email=#{email}")
    @Results({
            @Result(column = "username", property = "username"),
            @Result(column = "password", property = "password"),
            @Result(column = "email", property = "roles", javaType = List.class, many = @Many(select = "com.lcf.mapper.UserMapper.getRoleNameByEmail")),
    })
    User getUsernameAndRolesByEmail(@Param("email") String email);

    @Select("select r.name from user u LEFT JOIN user_role sru on u.id= sru.User_id LEFT JOIN role r on sru.Role_id=r.id where email=#{email}")
    Role getRoleNameByEmail(String email);

    @Select("select * from user where email=#{email}")
    User findUserByEmail(@Param("email") String email);

    @Select("select username from user where id=#{id}")
    String findUsernameById(int id);

    @Insert("insert into user(email,username,password,gender,avatarImgUrl) values(#{email},#{username},#{password},#{gender},#{avatarImgUrl})")
    void save(User user);

    @Select("select username from user where email=#{email}")
    User findUsernameByEmail(@Param("email") String email);

    @Select("select * from user where username=#{username}")
    User findUsernameByUsername(@Param("username") String username);

    @Insert("insert into user_role(User_id, Role_id) values (#{userId}, #{roleId})")
    void saveRole(@Param("userId") int userId, @Param("roleId") int roleId);

    @Select("select Role_id from user_role where User_id=#{userId}")
    List<Object> findRoleIdByUserId(@Param("userId") int userId);

    @Select("select id from user where email=#{email}")
    int findUserIdByEmail(@Param("email") String email);

    @Update("update user set password=#{password} where email=#{email}")
    void updatePassword(@Param("email") String email, @Param("password") String password);

    @Select("select email from user where username=#{username}")
    String findEmailByUsername(@Param("username") String username);

    @Select("select id from user where username=#{username}")
    int findIdByUsername(String username);

    @Update("update user set recentlyLanded=#{recentlyLanded} where email=#{email}")
    void updateRecentlyLanded(@Param("email") String email, @Param("recentlyLanded") String recentlyLanded);

    @Update("update user set avatarImgUrl=#{avatarImgUrl} where id=#{id}")
    void updateAvatarImgUrlById(@Param("avatarImgUrl") String avatarImgUrl, @Param("id") int id);

    @Select("select avatarImgUrl from user where id=#{id}")
    String getHeadPortraitUrl(@Param("id") int id);

    @Select("select * from user where username=#{username}")
    User getUserPersonalInfoByUsername(@Param("username") String username);

    @Update("update user set username=#{user.username},gender=#{user.gender},trueName=#{user.trueName},birthday=#{user.birthday},phone=#{user.phone},personalBrief=#{user.personalBrief} where username=#{username}")
    void savePersonalDate(@Param("user") User user, @Param("username") String username);

    @Select("select count(*) from user")
    int countUserNum();

    /**
     * 根据email判断用户是否存在
     * @param email
     * @return
     */
    @Select("select exists (select 1 from user where email = #{email})")
    int isUserExist(String email);
}
