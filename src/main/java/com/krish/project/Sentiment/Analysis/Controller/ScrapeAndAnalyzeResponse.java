package com.krish.project.Sentiment.Analysis.Controller;

import com.krish.project.Sentiment.Analysis.Model.ReviewAnalysisResult;

import java.util.List;
import java.util.Map;

public class ScrapeAndAnalyzeResponse {

    private String summary;
    private List<ReviewAnalysisResult> reviewAnalyses;

    // Getters and Setters
    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<ReviewAnalysisResult> getReviewAnalyses() {
        return reviewAnalyses;
    }

    public void setReviewAnalyses(List<ReviewAnalysisResult> reviewAnalyses) {
        this.reviewAnalyses = reviewAnalyses;
    }
}