package com.hackathon.safenet.application.service.meteo;

import com.hackathon.safenet.domain.model.meteoalarm.MeteoAlarmItem;
import com.hackathon.safenet.domain.model.meteoalarm.MeteoAlarmResponse;
import com.hackathon.safenet.domain.ports.inbound.MeteoAlarmPort;
import com.hackathon.safenet.domain.ports.outbound.MeteoAlarmFeedPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayInputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class MeteoAlarmService implements MeteoAlarmPort {

    private final MeteoAlarmFeedPort meteoAlarmFeedPort;

    public MeteoAlarmResponse getMeteoAlarmData(String language) {
        try {
            log.info("Fetching MeteoAlarm data for language: {}", language);
            // Fetch RSS feed
            String rssContent = meteoAlarmFeedPort.fetchFeedContent();
            if (rssContent == null) {
                throw new RuntimeException("Failed to fetch RSS content");
            }
            // Parse XML
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(new ByteArrayInputStream(rssContent.getBytes()));
            // Extract channel information
            Element channel = (Element) document.getElementsByTagName("channel").item(0);
            String title = MeteoAlarmParser.getTextContent(channel, "title");
            String description = MeteoAlarmParser.getTextContent(channel, "description");
            String link = MeteoAlarmParser.getTextContent(channel, "link");
            String channelLanguage = MeteoAlarmParser.getTextContent(channel, "language");
            String ttlStr = MeteoAlarmParser.getTextContent(channel, "ttl");
            Integer ttl = ttlStr != null ? Integer.parseInt(ttlStr) : null;
            // Extract items
            NodeList itemNodes = document.getElementsByTagName("item");
            List<MeteoAlarmItem> items = new ArrayList<>();
            for (int i = 1; i < itemNodes.getLength(); i++) {
                Element itemElement = (Element) itemNodes.item(i);
                MeteoAlarmItem item = parseItem(itemElement, language);
                if (item != null) {
                    items.add(item);
                }
            }
            return MeteoAlarmResponse.builder()
                    .title(title)
                    .description(description)
                    .link(link)
                    .language(channelLanguage)
                    .ttl(ttl)
                    .items(items)
                    .build();
        } catch (Exception e) {
            log.error("Error fetching MeteoAlarm data", e);
            throw new RuntimeException("Failed to fetch MeteoAlarm data", e);
        }
    }

    private MeteoAlarmItem parseItem(Element itemElement, String requestedLanguage) {
        try {
            String title = MeteoAlarmParser.getTextContent(itemElement, "title");
            String description = MeteoAlarmParser.getTextContent(itemElement, "description");
            String link = MeteoAlarmParser.getTextContent(itemElement, "link");
            String guid = MeteoAlarmParser.getTextContent(itemElement, "guid");
            String pubDateStr = MeteoAlarmParser.getTextContent(itemElement, "pubDate");
            LocalDateTime pubDate = MeteoAlarmParser.parsePubDate(pubDateStr);
            Integer awarenessLevel = MeteoAlarmParser.extractAwarenessLevel(description);
            Integer awarenessType = MeteoAlarmParser.extractAwarenessType(description);
            LocalDateTime validFrom = MeteoAlarmParser.extractDateTime(description, "From:");
            LocalDateTime validUntil = MeteoAlarmParser.extractDateTime(description, "Until:");
            String languageSpecificDescription = MeteoAlarmParser.extractLanguageSpecificDescription(description, requestedLanguage);
            return MeteoAlarmItem.builder()
                    .title(title)
                    .description(languageSpecificDescription != null ? languageSpecificDescription : description)
                    .link(link)
                    .guid(guid)
                    .pubDate(pubDate)
                    .region(title)
                    .awarenessLevel(awarenessLevel)
                    .awarenessType(awarenessType)
                    .validFrom(validFrom)
                    .validUntil(validUntil)
                    .language(requestedLanguage)
                    .build();
        } catch (Exception e) {
            log.error("Error parsing item", e);
            return null;
        }
    }
}