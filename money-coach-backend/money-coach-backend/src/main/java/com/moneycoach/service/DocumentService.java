package com.moneycoach.service;

import com.moneycoach.dto.DocumentUploadResponseDto;
import com.moneycoach.model.BankStatement;
import com.moneycoach.repository.BankStatementRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class DocumentService {

    private final BankStatementRepository bankStatementRepository;

    public DocumentService(
            BankStatementRepository bankStatementRepository) {

        this.bankStatementRepository = bankStatementRepository;
    }

    public DocumentUploadResponseDto uploadDocument(
            MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            throw new IllegalArgumentException(
                    "The uploaded document is empty");
        }

        BankStatement bankStatement = new BankStatement(
                file.getOriginalFilename(),
                file.getContentType(),
                LocalDateTime.now(),
                file.getBytes()
        );

        BankStatement savedStatement =
                bankStatementRepository.save(bankStatement);

        return new DocumentUploadResponseDto(
                savedStatement.getStatementID(),
                savedStatement.getFileName(),
                "Bank statement uploaded successfully"
        );
    }
}
