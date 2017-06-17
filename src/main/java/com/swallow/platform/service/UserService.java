package com.swallow.platform.service;

import com.swallow.platform.dao.UserDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Created by swallow on 2017/5/5.
 */

@Service
@Transactional
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserDao userDao;

    public int insertUserComplete(Map<String, Object> param) {
        this.userName(param);
        return userDao.insertUserComplete(param);
    }

    public int insertUserSimple(Map<String, Object> param) {
        return userDao.insertUserSimple(param);
    }

    public int updateUser(Map<String, Object> param) {
        return userDao.updateUser(param);
    }

    public List<Map<String, Object>> queryUserList(Map<String, Object> param) {
        return userDao.queryUserList(param);
    }

    public void userName(Map<String, Object> param){
        LOGGER.info(">>>>>>>>>>>>>>userName<<<<<<<<<<<<<<<<<<");
    }
}
