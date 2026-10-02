package com.moneycoach.dto;

public class DocumentUploadResponseDto {

    private int statementID;
    private String fileName;
    private String message;

    public DocumentUploadResponseDto(
            int statementID,
            String fileName,
            String message) {

        this.statementID = statementID;
        this.fileName = fileName;
        this.message = message;
    }

    public int getStatementID() {
        return statementID;
    }

    public String getFileName() {
        return fileName;
    }

    public String getMessage() {
        return message;
    }
}