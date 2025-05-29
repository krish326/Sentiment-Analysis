package com.krish.project.Sentiment.Analysis.Controller;

import com.krish.project.Sentiment.Analysis.Model.ReviewScraper;
import com.krish.project.Sentiment.Analysis.Model.SentimentAnalyzer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ReviewRestController {

    @Autowired
    SentimentAnalyzer sentimentAnalyzer = new SentimentAnalyzer();
    private ReviewScraper reviewScraper = new ReviewScraper();

//    @CrossOrigin(origins = "*")
//    @PostMapping("/review")
//    public Map<String, String> getSentiment(@RequestBody String link) {
//        String result = sentimentAnalyzer.analyzeAspectSentimentsSimple(link);
//
//        return Map.of("sentiment", result);
//    }

//    @CrossOrigin(origins = "*")
//    @PostMapping("/batch")
//    public List<Map<String, String>> analyzeSentiments(@RequestBody List<String> reviews) {
//        return reviews.stream()
//                .map(text -> Map.of("review", text, "sentiment", sentimentAnalyzer.analyzeAspectSentimentsSimple(text)))
//                .collect(Collectors.toList());
//    }

    @CrossOrigin(origins = "*")
    @PostMapping("/aspect-review")
    public Map<String, String> analyzeAspects(@RequestBody String review) {
        return sentimentAnalyzer.analyzeAspects(review);
    }

    @PostMapping("/scrape")
    public List<Map<String, Object>> analyzeLink(@RequestBody String url) throws IOException {
        List<String> reviews = reviewScraper.scrapeReviews(url);

        System.out.println(reviews);

        // Static aspect list for now
        List<String> aspects = List.of("battery", "camera", "performance", "screen", "design");

        return reviews.stream()
                .map(text -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("review", text);
                    result.put("aspects", sentimentAnalyzer.analyzeAspectSentimentsSimple(text, aspects));
                    return result;
                })
                .collect(Collectors.toList());
    }
}
