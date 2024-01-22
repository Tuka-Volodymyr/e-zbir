package com.ua.ezbir.repository;

import com.ua.ezbir.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    // range fuzzy search 0.0 - 1.0 (1 - complete identity and 0 - no similarity)
    @Query(value = "SELECT * FROM users WHERE similarity(username, ?1) > 0.3", nativeQuery = true)
    List<User> findByUsernameContainingIgnoreCase(String username);
}
