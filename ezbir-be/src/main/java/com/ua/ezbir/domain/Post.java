package com.ua.ezbir.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    @ManyToOne
    @JoinColumn(name = "fundraiser_id")
    @JsonBackReference
    private Fundraiser fundraiser;
    @ElementCollection
    @Column(length =  100000000)
    private List<byte[]> listPhoto;
    private String text;
    private LocalDateTime currentDateTime;
    //will add comment and like or som else
}
