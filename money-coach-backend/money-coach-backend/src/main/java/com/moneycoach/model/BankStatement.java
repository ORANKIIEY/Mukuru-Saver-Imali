package com.moneycoach.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bank_statements")
public class BankStatement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int statementID;

    private String fileName;

    private String contentType;

    private LocalDateTime uploadedAt;

    @Lob
    @Column(name = "document_data")
    private byte[] documentData;

    public BankStatement() {
    }

    public BankStatement(
            String fileName,
            String contentType,
            LocalDateTime uploadedAt,
            byte[] documentData) {

        this.fileName = fileName;
        this.contentType = contentType;
        this.uploadedAt = uploadedAt;
        this.documentData = documentData;
    }

    public int getStatementID() {
        return statementID;
    }

    public String getFileName() {
        return fileName;
    }

    public String getContentType() {
        return contentType;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public byte[] getDocumentData() {
        return documentData;
    }
}