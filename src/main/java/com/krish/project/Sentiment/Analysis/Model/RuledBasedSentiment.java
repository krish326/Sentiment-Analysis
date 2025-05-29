package com.krish.project.Sentiment.Analysis.Model;

import java.util.Set;

public class RuledBasedSentiment {

    private static final Set<String> positiveWords = Set.of("good", "great", "excellent", "amazing", "fast", "recommend", "love", "nice", "awesome");
    private static final Set<String> negativeWords = Set.of("bad", "terrible", "poor", "slow", "hate", "worst", "broken", "disappointed", "awful");
    private static final Set<String> negations = Set.of("not", "no", "never", "hardly");

    public  String analyze(String cleanedText) {
        String[] tokens = cleanedText.split("\\s+");
        int score = 0;
        boolean negation = false;

        for (String word : tokens) {
            if (negations.contains(word)) {
                negation = true;
                continue;
            }

            if (positiveWords.contains(word)) {
                score += negation ? -1 : 1;
            } else if (negativeWords.contains(word)) {
                score += negation ? 1 : -1;
            }

            // Reset negation after one word (simple logic)
            negation = false;
        }

        // Final classification
        if (score > 1) return "Positive";
        else if (score < -1) return "Negative";
        else return "Neutral";
    }
}
