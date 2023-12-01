package com.ua.ezbir.repository;

import com.ua.ezbir.domain.Fundraiser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface FundraiserRepository extends JpaRepository<Fundraiser,Long> {
    Optional<Fundraiser> findBy();

    // range fuzzy search 0.0 - 1.0 (1 - complete identity and 0 - no similarity)
//    @Query(value = "SELECT * FROM fundraisers WHERE pg_trgm.similarity(name, :name) > 0.3", nativeQuery = true)
    List<Fundraiser> findByNameContainingIgnoreCase(@Param("name") String name);

}
