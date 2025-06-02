package com.krish.project.Sentiment.Analysis.Service;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.beans.factory.annotation.Value;
import jakarta.annotation.PreDestroy;

import java.time.Duration;

@Configuration
public class SeleniumConfig {

   // @Value("${webdriver.chrome.driver.path}")
    // private String chromeDriverPath;

    @Bean(destroyMethod = "quit")
    @Scope("singleton") // Or "prototype" if you need a fresh instance for every scrape
    public WebDriver chromeWebDriver() {

       // System.setProperty("webdriver.chrome.driver", chromeDriverPath);

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");
        options.addArguments("--ignore-certificate-errors");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--remote-allow-origins=*");

        // Add a User-Agent to mimic a real browser
        options.addArguments("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36");

        WebDriver driver = new ChromeDriver(options);
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        return driver;
    }

//    // Ensure the WebDriver is properly closed when the application context shuts down
//    @PreDestroy
//    public void closeWebDriver() {
//        WebDriver driver = chromeWebDriver(); // Get the singleton instance
//        if (driver != null) {
//            driver.quit();
//        }}
}