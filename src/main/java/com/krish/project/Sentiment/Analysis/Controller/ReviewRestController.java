package com.krish.project.Sentiment.Analysis.Controller;

import com.krish.project.Sentiment.Analysis.Model.FlipkartReviewScraper;
import com.krish.project.Sentiment.Analysis.Model.ReviewAnalysisResult;
import com.krish.project.Sentiment.Analysis.Model.AmazonReviewScraper;
import com.krish.project.Sentiment.Analysis.Model.SentimentAnalyzer;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ReviewRestController {

    @Autowired
    private final SentimentAnalyzer sentimentAnalyzer;
    private final AmazonReviewScraper amazonReviewScraper;
    private final FlipkartReviewScraper flipkartReviewScraper;

    public ReviewRestController(SentimentAnalyzer sentimentAnalyzer, AmazonReviewScraper amazonReviewScraper, FlipkartReviewScraper flipkartReviewScraper){
        this.sentimentAnalyzer = sentimentAnalyzer;
        this.amazonReviewScraper = amazonReviewScraper;
        this.flipkartReviewScraper = flipkartReviewScraper;
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
            if (url.contains("flipkart")) {
                List<String> reviews = flipkartReviewScraper.scrapeReviews(url);

                if (reviews.isEmpty()) {
                    System.out.println("No reviews scarpped for : " + url);
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>());
                }

                return getListResponseEntity(results, reviews);

            } try {
                List<String> reviews = amazonReviewScraper.scrapeReviews(url);

                if (reviews.isEmpty()) {
                    System.out.println("No reviews scraped for: " + url);
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>());
                }

                return getListResponseEntity(results, reviews);
            } catch(Exception e){
                System.err.println("Error in /scrape endpoint: " + e.getMessage());
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } catch (Exception f)

    {
        System.out.println("Error in /scrape endpoint: " + f.getMessage());
        f.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }    }

    private ResponseEntity<List<ReviewAnalysisResult>> getListResponseEntity(List<ReviewAnalysisResult> results, List<String> reviews) {
        for (String review : reviews) {
            String overall = sentimentAnalyzer.getOverallSentiment(review);
            Map<String, String> aspect = sentimentAnalyzer.analyzeAspects(review);

            ReviewAnalysisResult analysisResult = new ReviewAnalysisResult();

            analysisResult.setReviewText(review);
            analysisResult.setOverallSentiment(overall);
            analysisResult.setAspectSentiments(aspect);
            results.add(analysisResult);
        }
        return ResponseEntity.ok(results);
    }
}
