package com.moneycoach.controller;

import com.moneycoach.dto.DocumentUploadResponseDto;
import com.moneycoach.service.DocumentService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public DocumentUploadResponseDto uploadDocument(
            @RequestParam("file") MultipartFile file)
            throws IOException {

        return documentService.uploadDocument(file);
    }
}


//
//Important: this is only the upload/storage stage. It does not yet scan the statement and
//extract transactions. That's the next layer we'll build,
//and we'll connect those extracted transactions to your existing TransactionService and CategorisationService.