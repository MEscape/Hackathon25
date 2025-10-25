package com.hackathon25.safenet.application.service.meteo;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MeteoAlarmParser {
    public static String getTextContent(Element parent, String tagName) {
        NodeList nodeList = parent.getElementsByTagName(tagName);
        if (nodeList.getLength() > 0) {
            Node node = nodeList.item(0);
            return node.getTextContent();
        }
        return null;
    }

    public static Integer extractAwarenessLevel(String description) {
        if (description == null) return null;
        Pattern pattern = Pattern.compile("level:(\\d+)");
        Matcher matcher = pattern.matcher(description);
        if (matcher.find()) {
            return Integer.parseInt(matcher.group(1));
        }
        return null;
    }

    public static Integer extractAwarenessType(String description) {
        if (description == null) return null;
        Pattern pattern = Pattern.compile("awt:(\\d+)");
        Matcher matcher = pattern.matcher(description);
        if (matcher.find()) {
            return Integer.parseInt(matcher.group(1));
        }
        return null;
    }

    public static LocalDateTime extractDateTime(String description, String prefix) {
        if (description == null) return null;
        Pattern pattern = Pattern.compile(prefix + "\\s*</b>\\s*<i>([^<]+)</i>");
        Matcher matcher = pattern.matcher(description);

        if (matcher.find()) {
            try {
                String dateStr = matcher.group(1).trim();
                return ZonedDateTime.parse(dateStr).toLocalDateTime();
            } catch (Exception e) {
                // Optionally log or handle parse error
            }
        }
        return null;
    }

    public static LocalDateTime parsePubDate(String pubDateStr) {
        if (pubDateStr == null) return null;
        try {
            DateTimeFormatter rfc822Formatter = new DateTimeFormatterBuilder()
                    .parseCaseInsensitive()
                    .appendPattern("EEE, dd MMM yy HH:mm:ss ")
                    .appendOffset("+HHMM", "+0000")
                    .toFormatter(Locale.ENGLISH);

            return ZonedDateTime.parse(pubDateStr.trim(), rfc822Formatter).toLocalDateTime();
        } catch (Exception e) {
            // Optionally log or handle parse error
        }
        return null;
    }

    public static String extractLanguageSpecificDescription(String description, String language) {
        if (description == null) return null;

        String languageCode = language.equals("german") ? "de-DE" : "en";
        Pattern pattern = Pattern.compile(languageCode + "\\):\\s*([^\\n]+(?:\\n(?!\\w+\\([^)]+\\):)[^\\n]*)*)");
        Matcher matcher = pattern.matcher(description);

        if (matcher.find()) {
            return matcher.group(1).trim();
        }

        return null;
    }
}