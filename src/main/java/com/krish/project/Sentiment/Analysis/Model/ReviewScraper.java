package com.krish.project.Sentiment.Analysis.Model;

import jakarta.persistence.Column;
import org.jsoup.Jsoup;

import org.jsoup.select.Elements;
import org.jsoup.nodes.Element;
import java.io.IOException;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReviewScraper {

    public List<String> scrapeReviews(String url) throws IOException {
        List<String> reviews = new ArrayList<>();

        // Set user-agent to mimic a browser
        Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36") // Example User-Agent
                .referrer("http://www.google.com") // Simulate traffic from Google
                .timeout(10000) // 10 seconds timeout
                .get();

        // Amazon uses "review-text-content" or similar, may need updating based on current DOM
        Elements reviewElements = doc.select(".review-text-content span");
        System.out.println("Fetched HTML: " + doc.outerHtml());

        for (Element reviewElement : reviewElements) {
            reviews.add(reviewElement.text());
        }

        return reviews;
    }
}