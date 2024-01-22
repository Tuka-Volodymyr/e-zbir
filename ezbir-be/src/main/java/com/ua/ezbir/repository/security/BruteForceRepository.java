package com.ua.ezbir.repository.security;

import com.ua.ezbir.domain.security.BruteForce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BruteForceRepository extends JpaRepository<BruteForce,Long> {
    Optional<BruteForce> findByIpAddress(String ip);
}
