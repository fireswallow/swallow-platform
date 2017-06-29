package com.swallow.platform.common;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by swallow on 2017/6/25.
 */
public class User extends People {

    public static String ii = "12";

    public User(int rr) {
        System.out.println("user int===");
    }

    public User(String rr) {
        super(0);
        System.out.println("user String===");
    }

    public static void main(String[] args) {
        Integer i =55;
        System.out.println(i);
    }

    public void tt() {

    }
}
