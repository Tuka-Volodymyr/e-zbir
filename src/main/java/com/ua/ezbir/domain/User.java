package com.ua.ezbir.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    private String email;
    private String username;
    private String password;
    private String infoAboutYourself;
    @Column(length = 10000000)
    private byte[] bytePhoto;

    @OneToMany(mappedBy = "user")
    private List<Fundraiser> fundraiserList;
    private LocalDateTime currentDateTime;
}
