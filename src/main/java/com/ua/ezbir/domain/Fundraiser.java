package com.ua.ezbir.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "fundraisers")
public class Fundraiser
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCollection;

}
