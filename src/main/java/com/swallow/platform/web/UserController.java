package com.swallow.platform.web;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Callable;

/**
 * Created by swallow on 2017/5/3.
 */
@Controller
@RequestMapping("user")
public class UserController {
    @RequestMapping("userList")
    public ModelAndView userList() {
        ModelAndView modelAndView = new ModelAndView("userList");
        modelAndView.addObject("name", "swallow");
        return modelAndView;
    }

    @RequestMapping("testAjax1")
    @ResponseBody
    public Map<String, Object> testAjax1(@RequestParam Map<String, String> param) {
        System.out.println("param==>" + JSON.toJSONString(param));

        System.out.println("UserController.testAjax1");
        Map<String, Object> resultData = new HashMap<>(3);
        resultData.put("AA", "AA");
        resultData.put("BB", new Date());
        resultData.put("CC", 66);
        return resultData;
    }


    @RequestMapping("asynchronous")
    @ResponseBody
    public Callable<Map<String, Object>> asynchronous(@RequestParam Map<String, String> param) {
        System.out.println("param==>" + JSON.toJSONString(param));
        System.out.println("UserController.asynchronous");

        return new Callable<Map<String, Object>>() {
            @Override
            public Map<String, Object> call() throws Exception {
                Thread.sleep(5000);
                Map<String, Object> resultData = new HashMap<>(3);
                resultData.put("AA", "AA");
                resultData.put("BB", new Date());
                resultData.put("CC", 66);
                return resultData;
            }
        };

    }
}
