package com.swallow.platform.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

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
}
