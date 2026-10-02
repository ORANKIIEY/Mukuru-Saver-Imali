package com.moneycoach.controller;

import com.moneycoach.dto.DocumentUploadResponseDto;
import com.moneycoach.service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/upload")
    public ResponseEntity<DocumentUploadResponseDto> uploadBankStatement(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "sampleText", required = false) String sampleText) {

        String fileName = (file != null && !file.isEmpty()) ? file.getOriginalFilename() : "Mukuru_Bank_Statement.pdf";
        DocumentUploadResponseDto response = documentService.processBankStatement(fileName, sampleText);
        return ResponseEntity.ok(response);
    }
}
