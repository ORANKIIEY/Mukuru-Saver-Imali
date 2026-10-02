package com.moneycoach.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class StatementExtractionService {

    public String extractText(MultipartFile file) throws Exception {

        byte[] document = file.getBytes();

        try (var pdfDocument = Loader.loadPDF(document)) {

            PDFTextStripper pdfTextStripper =
                    new PDFTextStripper();

            return pdfTextStripper.getText(pdfDocument);
        }
    }
}