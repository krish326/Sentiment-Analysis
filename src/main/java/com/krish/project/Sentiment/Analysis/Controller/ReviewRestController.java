// In file: ReviewRestController.java
package com.krish.project.Sentiment.Analysis.Controller;

import com.krish.project.Sentiment.Analysis.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ReviewRestController {

    private final SentimentAnalyzer sentimentAnalyzer;
    private final AmazonReviewScraper amazonScraper;
    private final FlipkartReviewScraper flipkartScraper;
    private final ReviewSummarizer reviewSummarizer;

    @Autowired
    public ReviewRestController(
            SentimentAnalyzer sentimentAnalyzer,
            AmazonReviewScraper amazonScraper,
            FlipkartReviewScraper flipkartScraper,
            ReviewSummarizer reviewSummarizer
    ){
        this.sentimentAnalyzer = sentimentAnalyzer;
        this.amazonScraper = amazonScraper;
        this.flipkartScraper = flipkartScraper;
        this.reviewSummarizer = reviewSummarizer;
    }

    @GetMapping("/scrape")
    public ResponseEntity<ScrapeAndAnalyzeResponse> scrapeAndAnalyze(@RequestParam String url) {
        ScrapeAndAnalyzeResponse compositeResponse = new ScrapeAndAnalyzeResponse();
        List<ReviewAnalysisResult> analysisResults = new ArrayList<>();

        try {
            System.out.println("Attempting to scrape reviews from: " + url);
            List<String> reviews;

            if (url.toLowerCase().contains("flipkart.com")) {
                System.out.println("Flipkart URL detected. Using FlipkartReviewScraper.");
                reviews = flipkartScraper.scrapeReviews(url);
            } else if (url.toLowerCase().contains("amazon.")) {
                System.out.println("Amazon URL detected. Using AmazonReviewScraper.");
                reviews = amazonScraper.scrapeReviews(url);
            } else {
                compositeResponse.setSummary("Unsupported URL. Please use a valid Amazon or Flipkart product URL.");
                return ResponseEntity.badRequest().body(compositeResponse);
            }

            if (reviews == null || reviews.isEmpty()) {
                System.out.println("No reviews were scraped for the URL: " + url);
                compositeResponse.setSummary("Could not find any reviews for this product on the page.");
                return ResponseEntity.ok(compositeResponse);
            }

            // 1. Generate the AI summary
            String summary = reviewSummarizer.summarizeReviews(reviews);
            compositeResponse.setSummary(summary);

            // 2. Analyze individual reviews for aspects
            for (String review : reviews) {
                String overall = sentimentAnalyzer.getOverallSentiment(review);
                Map<String, String> aspects = sentimentAnalyzer.analyzeAspects(review);

                ReviewAnalysisResult analysis = new ReviewAnalysisResult();
                analysis.setReviewText(review);
                analysis.setOverallSentiment(overall);
                analysis.setAspectSentiments(aspects);
                analysisResults.add(analysis);
            }

            compositeResponse.setReviewAnalyses(analysisResults);
            return ResponseEntity.ok(compositeResponse);

        } catch (Exception e) {
            System.err.println("Error in /scrape endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}