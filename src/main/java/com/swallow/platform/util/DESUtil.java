package com.swallow.platform.util;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.crypto.*;
import java.io.IOException;
import java.nio.charset.Charset;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

/**
 * Created by swallow on 2017/6/10.
 */
public class DESUtil {
    private static Key key;
    private static String KEY_STR = "swallow";

    static {
        try {
            KeyGenerator keyGenerator = KeyGenerator.getInstance("DES");
            keyGenerator.init(new SecureRandom(KEY_STR.getBytes()));
            key = keyGenerator.generateKey();
            keyGenerator = null;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    public static String encrypt(String plaintext) throws InvalidKeyException, NoSuchPaddingException, NoSuchAlgorithmException, BadPaddingException, IllegalBlockSizeException {
        BASE64Encoder base64Encoder = new BASE64Encoder();
        byte[] bytes = plaintext.getBytes(Charset.forName("UTF-8"));
        Cipher cipher = Cipher.getInstance("DES");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encrypt = cipher.doFinal(bytes);
        String encryptStr = base64Encoder.encode(encrypt);
        return encryptStr;
    }

    public static String decrypt(String encrypt) throws IOException, NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
        BASE64Decoder base64Decoder = new BASE64Decoder();
        byte[] bytes = base64Decoder.decodeBuffer(encrypt);
        Cipher cipher = Cipher.getInstance("DES");
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] decrypt = cipher.doFinal(bytes);
        String decryptStr = new String(decrypt, "UTF-8");
        return decryptStr;
    }
}
