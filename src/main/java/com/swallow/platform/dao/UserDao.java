package com.swallow.platform.dao;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by swallow on 2017/5/4.
 */
@Repository
public interface UserDao {
    public int insertUserComplete(Map<String, Object> param);

    public int insertUserSimple(Map<String, Object> param);

    public int updateUser(Map<String, Object> param);

    public List<Map<String, Object>> queryUserList(Map<String, Object> param);
}
