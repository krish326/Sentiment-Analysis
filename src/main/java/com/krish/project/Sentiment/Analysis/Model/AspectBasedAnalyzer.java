package com.krish.project.Sentiment.Analysis.Model;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class AspectBasedAnalyzer {

    private List<String> definedWords = Arrays.asList(
            "battery", "screen", "display", "camera", "price", "speed", "performance", "design", "build", "sound", "speaker"
    );

    public Set<String> extractAspects(String text){
        Set<String> foundAspects = new HashSet<>();
        String lowered = text.toLowerCase();

        for (String aspect : definedWords) {
            if (lowered.contains(aspect)) {
                foundAspects.add(aspect);
            }
        }
        return foundAspects;
    }
}
