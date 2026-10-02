package com.moneycoach.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moneycoach.model.Product;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.util.List;
import java.util.Optional;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;

@Repository
public class JsonProductRepository implements ProductRepository {

    public record Catalogue(List<Product> products) {
    }

    private final List<Product> products;

    public JsonProductRepository(ObjectMapper mapper) {
        try (InputStream in = new ClassPathResource("data/grocery-prices.json").getInputStream()) {
            this.products = List.copyOf(mapper.readValue(in, Catalogue.class).products());
        } catch (IOException e) {
            throw new UncheckedIOException("Could not load data/grocery-prices.json", e);
        }
    }

    @Override
    public List<Product> findAll() {
        return products;
    }

    @Override
    public Optional<Product> findById(String id) {
        return products.stream().filter(p -> p.id().equals(id)).findFirst();
    }
}
