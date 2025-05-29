package com.krish.project.Sentiment.Analysis.Model;

import java.util.Set;

public class TextPreProcessor {

    public final Set<String> STOPWORDS = Set.of(
            "the", "is", "at", "which", "on", "and", "a", "an", "this", "that", "it", "to", "in", "but", "i"
    );

    public String preProcess(String words){

        words = words.toLowerCase();

        words = words.replaceAll("[^a-zA-Z\\s]", "");

        String[] text = words.split("\\s+");

        // Remove stopwords
        StringBuilder cleaned = new StringBuilder();
        for (String word : text) {
            if (!STOPWORDS.contains(word)) {
                cleaned.append(word).append(" ");
            }
        }
        return cleaned.toString().trim();
    }
}
