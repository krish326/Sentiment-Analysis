package com.krish.project.Sentiment.Analysis.Utils;

import com.krish.project.Sentiment.Analysis.Model.ReviewScraper;
import com.krish.project.Sentiment.Analysis.Model.SentimentAnalyzer;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class test {
    public static void main(String[] args) throws IOException {
        SentimentAnalyzer analyzer = new SentimentAnalyzer();

         ReviewScraper reviewScraper = new ReviewScraper();

        String url = "https://www.amazon.in/Redmi-Storage-Segment-Largest-Charging/dp/B0DLW1L5PR?_encoding=UTF8&content-id=amzn1.sym.ae01eb9b-88fb-41c0-8393-6aa705355d89&dib=eyJ2IjoiMSJ9.Zu16M0f4gcJTITvmFzGqs6i-VgJS6_l1oiEm5rOnyM5RolzvyHiUE_ze9ah8M_MqnHorx7eVx59LERmdTudBqQcnHvH9fohEUrCJy_v9Yr6SoFbiYt-JylKf_Q2KWsLpJdasesW8GGzrAW6FFgcXsL7ic_yWdt6le0jHcNeKLJygTBS2pOZZ1WMA69y1WIIRDm20G7iDUsQZfoD_dPRKMfl4ecdg-ldpO6tCHdzSe3D1DMRRMRNKpQjjabhF-CWcwzR55D86vBVYgi5YNCtJN9u7kkTY9PIq-2LKCcLf-qY.HxUFkbX-PCoO9HTe33yBGsao252M4lCl2Z78NFjydZo&dib_tag=se&pd_rd_r=de0bb879-dd76-4cdd-895c-d3973c768e2b&pd_rd_w=djO9o&pd_rd_wg=jIb21&qid=1748530913&refinements=p_85%3A10440599031%2Cp_n_deal_type%3A26921224031&rnid=26921223031&rps=1&s=electronics&sr=1-2&th=1";

        List<String> review = reviewScraper.scrapeReviews(url);


        System.out.println(review);

        List<String> aspects = Arrays.asList("battery", "camera", "performance", "screen", "design");

        for (String singleReview : review) {
            Map<String, String> aspectSentiments = analyzer.analyzeAspectSentimentsSimple(singleReview, aspects);
            System.out.println("Review: " + singleReview);
            System.out.println("Aspect Sentiment: " + aspectSentiments);
            System.out.println("-------------------------");
        }
    }}
