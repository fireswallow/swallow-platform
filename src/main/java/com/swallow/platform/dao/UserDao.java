package com.swallow.platform.dao;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by swallow on 2017/5/4.
 */
@Repository
public interface UserDao {
    public List<Map<String, Object>> userListCC(Map<String, Object> param);
}
