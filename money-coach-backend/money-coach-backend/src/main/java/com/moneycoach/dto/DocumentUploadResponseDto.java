package com.moneycoach.dto;

import java.util.List;

public class DocumentUploadResponseDto {
    private String fileName;
    private double detectedIncome;
    private double detectedCommitments;
    private double familyRemittances;
    private double suggestedSafeToSave;
    private double flexibleSpending;
    private String aiCoachRecommendation;
    private List<String> detectedTransactions;

    public DocumentUploadResponseDto() {}

    public DocumentUploadResponseDto(String fileName, double detectedIncome, double detectedCommitments, 
                                     double familyRemittances, double suggestedSafeToSave, 
                                     double flexibleSpending, String aiCoachRecommendation, 
                                     List<String> detectedTransactions) {
        this.fileName = fileName;
        this.detectedIncome = detectedIncome;
        this.detectedCommitments = detectedCommitments;
        this.familyRemittances = familyRemittances;
        this.suggestedSafeToSave = suggestedSafeToSave;
        this.flexibleSpending = flexibleSpending;
        this.aiCoachRecommendation = aiCoachRecommendation;
        this.detectedTransactions = detectedTransactions;
    }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public double getDetectedIncome() { return detectedIncome; }
    public void setDetectedIncome(double detectedIncome) { this.detectedIncome = detectedIncome; }

    public double getDetectedCommitments() { return detectedCommitments; }
    public void setDetectedCommitments(double detectedCommitments) { this.detectedCommitments = detectedCommitments; }

    public double getFamilyRemittances() { return familyRemittances; }
    public void setFamilyRemittances(double familyRemittances) { this.familyRemittances = familyRemittances; }

    public double getSuggestedSafeToSave() { return suggestedSafeToSave; }
    public void setSuggestedSafeToSave(double suggestedSafeToSave) { this.suggestedSafeToSave = suggestedSafeToSave; }

    public double getFlexibleSpending() { return flexibleSpending; }
    public void setFlexibleSpending(double flexibleSpending) { this.flexibleSpending = flexibleSpending; }

    public String getAiCoachRecommendation() { return aiCoachRecommendation; }
    public void setAiCoachRecommendation(String aiCoachRecommendation) { this.aiCoachRecommendation = aiCoachRecommendation; }

    public List<String> getDetectedTransactions() { return detectedTransactions; }
    public void setDetectedTransactions(List<String> detectedTransactions) { this.detectedTransactions = detectedTransactions; }
}
