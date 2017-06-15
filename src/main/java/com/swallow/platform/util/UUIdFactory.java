package com.swallow.platform.util;

import java.util.UUID;

/**
 * Created by swallow on 2017/6/15.
 */
public class UUIdFactory {

    public static String getId() {
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString().replace("-", "");
        return id;
    }
}
