package com.swallow.platform.service;

import com.alibaba.fastjson.JSON;
import com.swallow.platform.AppConfiguration;
import com.swallow.platform.util.UUIdFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by swallow on 2017/6/15.
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = AppConfiguration.class)
public class UserServiceTest {
    public static final String ID = UUIdFactory.getId();
    private final static Logger LOGGER = LoggerFactory.getLogger(UserServiceTest.class);
    @Autowired
    private UserService userService;


    @Test
    public void insertUserComplete() throws Exception {
        Map<String, Object> model = new HashMap<>();
        String id = UUIdFactory.getId();
        LOGGER.info("id===>" + id);
        model.put("userId", id);
        model.put("name", "解决");
        model.put("cardId", "123456789741852");
        model.put("password", "1fvb13");
        model.put("age", 34);
        model.put("createTime", new Date());

        userService.insertUserComplete(model);

    }

    @Test
    public void insertUserSimple() throws Exception {
        Map<String, Object> model = new HashMap<>();
        String id = UUIdFactory.getId();
        LOGGER.info("id===>" + id);
        model.put("userId", id);
        model.put("name", null);
        model.put("cardId", "123456789741852");
        model.put("password", "1fvb13");

        userService.insertUserComplete(model);
    }

    @Test
    public void updateUser() throws Exception {
        Map<String, Object> model = new HashMap<>();
        model.put("userId", "2e4f4b325afc42559d89da59a05c9b56");

        userService.updateUser(model);
    }

    @Test
    public void queryUserList() throws Exception {
        List<Map<String, Object>> modelList = userService.queryUserList(null);
        String s = JSON.toJSONString(modelList);
        LOGGER.info(s);
    }

}