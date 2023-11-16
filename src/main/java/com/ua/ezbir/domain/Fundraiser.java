package com.ua.ezbir.domain;

import com.ua.ezbir.web.dto.FundraiserDto;
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
public class Fundraiser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String name;
    private String jarLink;
    private String description;
    private boolean isClosed;

    public FundraiserDto toFundraiserDto(){
        return FundraiserDto.builder()
                .jarLink(getJarLink())
                .name(getName())
                .description(getDescription())
                .build();
    }
}