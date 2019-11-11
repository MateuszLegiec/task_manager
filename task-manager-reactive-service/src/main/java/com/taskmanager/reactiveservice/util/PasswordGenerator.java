package com.taskmanager.reactiveservice.util;

import java.util.Random;

public class PasswordGenerator {

    private final static String LOWER_CHARS = "abcdefghijklmnopqrstuvwxyz";
    private final static String UPPER_CHARS = "ABCDEFGHIJKLMNOPRSTUWXYZ";
    private final static String DIGITS = "123456789";
    private final static String SPEC_CHARS = "#?!@$%^&*-";
    private static Random random = new Random();

    public static String generate(){
        StringBuilder result = new StringBuilder();
        result.append(getRandomChar(SPEC_CHARS));
        result.append(getRandomChar(DIGITS));
        result.append(getRandomChar(UPPER_CHARS));

        for (int i = 0;i<4;i++)
            result.append(getRandomChar(LOWER_CHARS));

        return String.valueOf(result);
    }

    private static char getRandomChar(String s){return s.charAt(random.nextInt(s.length()));}
}