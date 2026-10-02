package com.moneycoach.service;

import com.moneycoach.dto.ExtractedTransactionDto;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class TransactionParsingService {

    private final DateTimeFormatter dateFormatter =
            DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private final Pattern transactionPattern =
            Pattern.compile(
                    "(\\d{2}/\\d{2}/\\d{4})\\s+(.+?)\\s+(-?\\d+(?:\\.\\d{2})?)"
            );

    public List<ExtractedTransactionDto> parseTransactions(
            String statementText) {

        List<ExtractedTransactionDto> transactions =
                new ArrayList<>();

        Matcher matcher =
                transactionPattern.matcher(statementText);

        while (matcher.find()) {

            LocalDate date =
                    LocalDate.parse(
                            matcher.group(1),
                            dateFormatter
                    );

            String description =
                    matcher.group(2).trim();

            double amount =
                    Double.parseDouble(matcher.group(3));

            transactions.add(
                    new ExtractedTransactionDto(
                            date,
                            description,
                            amount
                    )
            );
        }

        return transactions;
    }
}