package com.krish.project.Sentiment.Analysis.Controller;

import com.krish.project.Sentiment.Analysis.Model.ReviewAnalysisResult;
import com.krish.project.Sentiment.Analysis.Model.ReviewScraper;
import com.krish.project.Sentiment.Analysis.Model.SentimentAnalyzer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ReviewRestController {

    @Autowired
    private final SentimentAnalyzer sentimentAnalyzer;
    private final ReviewScraper reviewScraper;

    public ReviewRestController(SentimentAnalyzer sentimentAnalyzer, ReviewScraper reviewScraper){
        this.sentimentAnalyzer = sentimentAnalyzer;
        this.reviewScraper = reviewScraper;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/aspect-review")
    public Map<String, String> analyzeAspects(@RequestBody String review) {
        return sentimentAnalyzer.analyzeAspects(review);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/scrape")
    public ResponseEntity<List<ReviewAnalysisResult>> scrapeAndAnalyze(@RequestParam String url) {
        List<ReviewAnalysisResult> results = new ArrayList<>();
        try {
            System.out.println("Attempting to scrape reviews from: " + url);
            List<String> reviews = reviewScraper.scrapeReviews(url);

            if (reviews.isEmpty()) {
                System.out.println("No reviews scraped for: " + url);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>());
            }

            for (String review : reviews) {
                String overall = sentimentAnalyzer.getOverallSentiment(review);
                Map<String, String> aspects = sentimentAnalyzer.analyzeAspects(review);

                ReviewAnalysisResult analysis = new ReviewAnalysisResult();
                analysis.setReviewText(review);
                analysis.setOverallSentiment(overall);
                analysis.setAspectSentiments(aspects);
                results.add(analysis);
            }
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            System.err.println("Error in /scrape endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
