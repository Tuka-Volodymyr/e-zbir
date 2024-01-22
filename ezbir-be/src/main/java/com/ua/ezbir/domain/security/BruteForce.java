package com.ua.ezbir.domain.security;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class BruteForce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ipAddress;
    private int failAttempts;
    private boolean lock;

    public BruteForce(String ipAddress){
        this.ipAddress=ipAddress;
        this.failAttempts=0;
        this.lock=false;
    }
    public void addFailAttempts(){
        failAttempts++;
    }
    public void successAttempts(){
        failAttempts=0;
    }
}
