package com.hackathon.safenet.infrastructure.adapters.rss.mapper;

/**
 * Generic API mapper interface for converting raw API data to domain models
 * @param <D> Domain model type
 * @param <R> Raw API data type (e.g., String)
 */
public interface ApiMapper<D, R> {
    /**
     * Converts raw API data to a domain model
     * @param raw the raw API data (e.g., JSON String)
     * @return the domain model
     */
    D toDomain(R raw);
}