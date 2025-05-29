package com.krish.project.Sentiment.Analysis.Model;

import edu.stanford.nlp.pipeline.CoreDocument;
import edu.stanford.nlp.pipeline.CoreSentence;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SentimentAnalyzer {

    private final StanfordCoreNLP pipeline;
//    private TextPreProcessor textPreProcessor;
//    private RuledBasedSentiment ruledBasedSentiment;
//
//    //just for test now
    private AspectBasedAnalyzer analyzer;

    public SentimentAnalyzer() {
//        this.textPreProcessor = new TextPreProcessor();
//        this.ruledBasedSentiment = new RuledBasedSentiment();

        this.analyzer = new AspectBasedAnalyzer();

        Properties props = new Properties();
        props.setProperty("annotators", "tokenize,ssplit,parse,sentiment");
        this.pipeline = new StanfordCoreNLP(props);
    }


//    public String analyzeSentiment(String text) {
//        String cleaned = textPreProcessor.preProcess(text);
//        String preProcessedText = ruledBasedSentiment.analyze(cleaned);
//
//        CoreDocument doc = new CoreDocument(preProcessedText);
//        pipeline.annotate(doc);
//
//        int totalScore = 0;
//        int count = 0;
//
//        for (CoreSentence sentence : doc.sentences()) {
//            String sentiment = sentence.sentiment();
//            count++;
//            switch (sentiment.toLowerCase()) {
//                case "very positive": totalScore += 2; break;
//                case "positive": totalScore += 1; break;
//                case "neutral": break;
//                case "negative": totalScore -= 1; break;
//                case "very negative": totalScore -= 2; break;
//            }
//        }
//
//        double average = (count == 0) ? 0 : (double) totalScore / count;
//        if (average > 1) return "Very Positive";
//        else if (average > 0) return "Positive";
//        else if (average == 0) return "Neutral";
//        else if (average > -1) return "Negative";
//        else return "Very Negative";
//    }

    public Map<String, String> analyzeAspectSentimentsSimple(String text, List<String> aspects) {
        Map<String, String> aspectSentiments = new HashMap<>();
        String[] clauses = text.split("(?i)but|however|\\.|,|;|!|\\?");

        for (String aspect : aspects) {
            for (String clause : clauses) {
                if (clause.toLowerCase().contains(aspect.toLowerCase())) {
                    // Analyze sentiment for this clause
                    CoreDocument doc = new CoreDocument(clause);
                    pipeline.annotate(doc);

                    for (CoreSentence sentence : doc.sentences()) {
                        String sentiment = sentence.sentiment();
                        aspectSentiments.put(aspect, sentiment); // Keep latest for now
                    }
                    break; // Stop after first match
                }
            }
            // Default to Neutral if nothing found
            aspectSentiments.putIfAbsent(aspect, "Neutral");
        }

        return aspectSentiments;
    }

//    public Map<String, String> analyzeAspectSentiments(String text, List<String> aspects) {
//        Map<String, Integer> aspectScores = new HashMap<>();
//        Map<String, Integer> aspectCounts = new HashMap<>();
//
//        String preProcessed = textPreProcessor.preProcess(text);
//        CoreDocument doc = new CoreDocument(preProcessed);
//        pipeline.annotate(doc);
//
//        for (CoreSentence sentence : doc.sentences()) {
//            String sentenceText = sentence.text().toLowerCase();
//            String sentiment = sentence.sentiment();
//            int score = getSentimentScore(sentiment);
//
//            for (String aspect : aspects) {
//                if (sentenceText.contains(aspect.toLowerCase())) {
//                    aspectScores.put(aspect, aspectScores.getOrDefault(aspect, 0) + score);
//                    aspectCounts.put(aspect, aspectCounts.getOrDefault(aspect, 0) + 1);
//                }
//            }
//        }
//
//        // Convert scores to sentiment labels
//        Map<String, String> aspectSentiments = new HashMap<>();
//        for (String aspect : aspects) {
//            int count = aspectCounts.getOrDefault(aspect, 0);
//            if (count == 0) continue;
//            double avg = (double) aspectScores.get(aspect) / count;
//
//            String label;
//            if (avg > 1) label = "Very Positive";
//            else if (avg > 0) label = "Positive";
//            else if (avg == 0) label = "Neutral";
//            else if (avg > -1) label = "Negative";
//            else label = "Very Negative";
//
//            aspectSentiments.put(aspect, label);
//        }
//
//        return aspectSentiments;
//    }
//
//    private int getSentimentScore(String sentiment) {
//        switch (sentiment.toLowerCase()) {
//            case "very positive": return 2;
//            case "positive": return 1;
//            case "neutral": return 0;
//            case "negative": return -1;
//            case "very negative": return -2;
//            default: return 0;
//        }
//    }

    public Map<String, String> analyzeAspects(String review) {
        List<String> aspects = new ArrayList<>(analyzer.extractAspects(review));
        return analyzeAspectSentimentsSimple(review, aspects);
    }
}
