package com.ua.ezbir.domain;

import com.ua.ezbir.web.fundraiser.Category;
import com.ua.ezbir.web.fundraiser.FundraiserDto;
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
@Table(name = "fundraisers")
public class Fundraiser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fundraiserId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String name;
    private String jarLink;
    private String description;
    private boolean isClosed;
    private LocalDateTime currentDateTime;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> categories;
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "fundraiser")
    private List<Post> posts;
    public FundraiserDto toFundraiserDto(){
        return FundraiserDto.builder()
                .jarLink(getJarLink())
                .name(getName())
                .description(getDescription())
                .categories(getCategories())
                .build();
    }
}
