package com.krish.project.Sentiment.Analysis.Model;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class FlipkartReviewScraper {

    private final WebDriver driver;
    private final WebDriverWait wait;

    // --- CORRECTED SELECTORS BASED ON YOUR LATEST PAGE SOURCE ---
    private static final String REVIEW_CONTAINER_SELECTOR = "div.col.EPCmJX.Ma1fCG"; // Corrected case and no underscore
    private static final String READ_MORE_LINK_SELECTOR = "span.wTYmpv"; // Corrected "Read More" selector
    private static final String REVIEW_TEXT_HOLDER_SELECTOR = "div.ZmyHeo > div > div";
    private static final String TOTAL_PAGES_SPAN_SELECTOR = "div._1G0WLw.mpIySA > span"; // Corrected: classes on div, text in child span
    private static final String REVIEW_PAGE_NEXT_BUTTON_SELECTOR = "a._9QVEpD"; // Selector for "Next" page link

    @Autowired
    public FlipkartReviewScraper(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public List<String> scrapeReviews(String firstPageReviewsUrl) {
        List<String> allReviews = new ArrayList<>();
        int maxPagesToScrape = 5;
        int totalPages = 1;

        try {
            System.out.println("FlipkartScraper: Navigating to initial reviews page URL: " + firstPageReviewsUrl);
            driver.get(firstPageReviewsUrl);
            Thread.sleep(3000);

            System.out.println("DEBUG: Current URL loaded by Selenium: " + driver.getCurrentUrl());
            System.out.println("DEBUG: Current Page Title loaded by Selenium: " + driver.getTitle());

            // Print a small part of the source if still failing, to help debug further
            // String currentSource = driver.getPageSource();
            // System.out.println("DEBUG: Page source snippet (first 2000 chars): " + currentSource.substring(0, Math.min(currentSource.length(), 2000)));


            try {
                System.out.println("FlipkartScraper: Waiting for total pages span with selector: '" + TOTAL_PAGES_SPAN_SELECTOR + "'");
                WebElement totalPagesSpan = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(TOTAL_PAGES_SPAN_SELECTOR)));
                String pagesText = totalPagesSpan.getText();
                Pattern pattern = Pattern.compile("Page\\s+\\d+\\s+of\\s+(\\d+)");
                Matcher matcher = pattern.matcher(pagesText);

                if (matcher.find()) {
                    totalPages = Integer.parseInt(matcher.group(1));
                    System.out.println("FlipkartScraper: Total review pages found: " + totalPages);
                } else {
                    System.err.println("FlipkartScraper: Text format for total pages span ('" + pagesText + "') not as expected using selector '" + TOTAL_PAGES_SPAN_SELECTOR + "'. Defaulting max pages.");
                    totalPages = maxPagesToScrape;
                }
            } catch (Exception e) {
                System.err.println("FlipkartScraper: Could not determine total pages using selector '" + TOTAL_PAGES_SPAN_SELECTOR + "', defaulting to scrape a few. Error: " + e.getMessage());
                totalPages = maxPagesToScrape;
            }

            for (int currentPageNum = 1; currentPageNum <= Math.min(totalPages, maxPagesToScrape); currentPageNum++) {
                if (currentPageNum > 1) {
                    try {
                        System.out.println("FlipkartScraper: Looking for 'Next Page' button with selector: '" + REVIEW_PAGE_NEXT_BUTTON_SELECTOR + "'");
                        WebElement nextPageButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(REVIEW_PAGE_NEXT_BUTTON_SELECTOR)));
                        System.out.println("FlipkartScraper: Clicking 'Next Page' button.");
                        // Use JavaScript click if direct click is problematic
                        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", nextPageButton);
                        Thread.sleep(3500);
                    } catch (Exception e) {
                        System.err.println("FlipkartScraper: 'Next Page' button not found or not clickable with selector '" + REVIEW_PAGE_NEXT_BUTTON_SELECTOR + "'. Ending pagination. Error: " + e.getMessage());
                        break;
                    }
                }

                System.out.println("FlipkartScraper: Scraping reviews from page " + currentPageNum + " (Actual URL: " + driver.getCurrentUrl() + ")");

                List<WebElement> reviewWebElements;
                try {
                    System.out.println("FlipkartScraper: Waiting for review containers with selector: '" + REVIEW_CONTAINER_SELECTOR + "'");
                    wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(REVIEW_CONTAINER_SELECTOR)));
                    reviewWebElements = driver.findElements(By.cssSelector(REVIEW_CONTAINER_SELECTOR));
                } catch (Exception e) {
                    System.out.println("FlipkartScraper: No review containers found on page " + currentPageNum + " after explicit wait. Error: " + e.getMessage());
                    reviewWebElements = new ArrayList<>();
                }
                System.out.println("FlipkartScraper: Found " + reviewWebElements.size() + " review containers on this page (via Selenium).");

                if (reviewWebElements.isEmpty()) {
                    if (currentPageNum == 1) {
                        System.out.println("FlipkartScraper: No review containers found on the first review page. Check selectors or page content.");
                    } else {
                        System.out.println("FlipkartScraper: No more review containers found on page " + currentPageNum + ".");
                    }
                    // Only break if no reviews AND it's not the first page (unless totalPages was 1)
                    // or if totalPages was accurately determined and we are past it.
                    if (currentPageNum > 1 || totalPages == 1 || reviewWebElements.isEmpty() && currentPageNum >= totalPages) {
                        break;
                    }
                }

                for (WebElement reviewWebElement : reviewWebElements) {
                    try {
                        List<WebElement> readMoreInReview = reviewWebElement.findElements(By.cssSelector(READ_MORE_LINK_SELECTOR));
                        if (!readMoreInReview.isEmpty() && readMoreInReview.get(0).isDisplayed()) {
                            WebElement readMoreButton = readMoreInReview.get(0);
                            try {
                                ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({behavior: 'auto', block: 'center'});", readMoreButton);
                                Thread.sleep(200);
                                wait.until(ExpectedConditions.elementToBeClickable(readMoreButton));
                                ((JavascriptExecutor) driver).executeScript("arguments[0].click();", readMoreButton); // Using JS click directly
                                Thread.sleep(300);
                            } catch (Exception e) {
                                System.err.println("FlipkartScraper: Could not click 'Read More' link. Error: " + e.getMessage());
                            }
                        }

                        String reviewHtmlSnippet = reviewWebElement.getAttribute("outerHTML");
                        Document reviewDoc = Jsoup.parse(reviewHtmlSnippet);
                        Elements textElements = reviewDoc.select(REVIEW_TEXT_HOLDER_SELECTOR);

                        if (!textElements.isEmpty()) {
                            String reviewText = textElements.first().text().trim();
                            if (!reviewText.isEmpty()) {
                                allReviews.add(reviewText);
                            }
                        }
                    } catch (Exception e) {
                        System.err.println("FlipkartScraper: Error processing one review: " + e.getMessage());
                    }
                }
            }

            System.out.println("FlipkartScraper: Finished scraping. Total reviews extracted: " + allReviews.size());

        } catch (Exception e) {
            System.err.println("FlipkartScraper: A critical error occurred during scraping: " + e.getMessage());
            e.printStackTrace();
        }
        return allReviews;
    }
}