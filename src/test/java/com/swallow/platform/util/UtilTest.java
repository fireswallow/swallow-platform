package com.swallow.platform.util;

import org.junit.Test;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Created by swallow on 2017/6/10.
 */
public class UtilTest {

    @Test
    public void testDES(){
        try {
            String encrypt = DESUtil.encrypt("白日以上仅,黄河入海流,如穷千里目,跟上宜城路");
            System.out.println(encrypt);
            String decrypt = DESUtil.decrypt(encrypt);
            System.out.println(decrypt);
        } catch (InvalidKeyException | NoSuchPaddingException | BadPaddingException | NoSuchAlgorithmException | IllegalBlockSizeException | IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testLocal(){
        Locale locale = Locale.CHINA;
        DateFormat dateFormat = DateFormat.getDateInstance();
        String date = dateFormat.format(new Date());
        System.out.println(date);
    }
}
