package com.lcf.mapper;

import com.lcf.model.FriendLink;
import com.lcf.model.Picture;
import com.lcf.model.Reward;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface PictureMapper {

    @Select("select pictureArchive from pictures_archives order by id desc")
    List<String> findPictures();

    @Select("select count(*) from pictures where pictureDate like '%${pictureArchiveName}%'")
    int countPictureNum(@Param("pictureArchiveName") String pictureArchiveName);

    @Select("select pictureName,pictureUrl,pictureDate,pictureDesc from pictures order by id desc")
    List<Picture> findAllPicturesInfo();

    @Select("select pictureName,pictureUrl,pictureDate,pictureDesc from pictures where pictureDate like '%${pictureDate}%' order by id desc")
    List<Picture> findPicturesByPictureDate(@Param("pictureDate") String pictureDate);

    @Select("select count(*) from pictures")
    int countPictures();

    @Select("select * from pictures order by pictureDate desc")
    List<Picture> getAllPicture();

    @Delete("delete from pictures where id=#{id}")
    int deletePictureById(int id);

    @Insert("insert into pictures(pictureName,pictureUrl,pictureDate,pictureDesc) " +
            "values(#{pictureName},#{pictureUrl},#{pictureDate},#{pictureDesc})")
    int save(Picture picture);

    @Insert("insert into pictures_archives(pictureArchive) values(#{pictureArchive})")
    void savePictureArchive(@Param("pictureArchive") String pictureArchive);

    @Select("select IFNULL(max(id),0) from pictures_archives where pictureArchive=#{pictureArchive}")
    int findPictureArchive(@Param("pictureArchive") String pictureArchive);

    @Update("update pictures set pictureName=#{pictureName},pictureUrl=#{pictureUrl},pictureDate=#{pictureDate},pictureDesc=#{pictureDesc} where id=#{id}")
    void updatePicture(Picture picture);
}
