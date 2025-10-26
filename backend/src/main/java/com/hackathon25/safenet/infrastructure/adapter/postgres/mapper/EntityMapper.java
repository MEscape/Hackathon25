package com.hackathon25.safenet.infrastructure.adapter.postgres.mapper;

/**
 * Generic mapper interface for converting between domain models and entities
 *
 * @param <D> Domain model type
 * @param <E> Entity type
 */
public interface EntityMapper<D, E> {

  /**
   * Converts an entity to a domain model
   *
   * @param entity the entity to convert
   * @return the domain model
   */
  D toDomain(E entity);

  /**
   * Converts a domain model to an existing entity (with ID)
   *
   * @param domain the domain model to convert
   * @return the entity with ID
   */
  E toEntity(D domain);
}
