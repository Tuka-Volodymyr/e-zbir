package com.ua.ezbir.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ua.ezbir.web.fundraiser.FundraiserDto;
import com.ua.ezbir.web.fundraiser.FundraiserResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
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
    @JsonBackReference
    private User user;

    private float suma;
    private String name;
    private String jarLink;
    private String description;
    private boolean isClosed;
    private LocalDateTime currentDateTime;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> categories;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "fundraiser")
    @JsonManagedReference
    private List<Post> posts;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> cards;

    @Column(columnDefinition = "bigint default 0")
    private long views = 0;

    public FundraiserDto toFundraiserDto(){
        return FundraiserDto.builder()
                .jarLink(getJarLink())
                .name(getName())
                .description(getDescription())
                .categories(getCategories())
                .suma(getSuma())
                .cards(getCards())
                .build();
    }

    public static FundraiserResponse toFundraiserResponse(Fundraiser fundraiser){
        return new FundraiserResponse(
                fundraiser.getUser().getUser_id(),
                fundraiser.getUser().getFullName(),
                fundraiser.getFundraiserId(),
                fundraiser.getSuma(),
                fundraiser.getName(),
                fundraiser.getJarLink(),
                fundraiser.getDescription(),
                fundraiser.getCurrentDateTime(),
                fundraiser.getCategories(),
                fundraiser.getCards(),
                fundraiser.getPosts(),
                fundraiser.isClosed(),
                fundraiser.getViews());
    }

    public static List<FundraiserResponse> toListOfFundraiserResponse(List<Fundraiser> fundraiserList){
        List<FundraiserResponse> fundraiserResponseList = new ArrayList<>();
        fundraiserList.sort(Comparator.comparing(Fundraiser::getViews).reversed());
        for (Fundraiser fundraiser:fundraiserList) {
            FundraiserResponse fundraiserResponse = new FundraiserResponse(
                    fundraiser.getUser().getUser_id(),
                    fundraiser.getUser().getFullName(),
                    fundraiser.getFundraiserId(),
                    fundraiser.getSuma(),
                    fundraiser.getName(),
                    fundraiser.getJarLink(),
                    fundraiser.getDescription(),
                    fundraiser.getCurrentDateTime(),
                    fundraiser.getCategories(),
                    fundraiser.getCards(),
                    fundraiser.getPosts(),
                    fundraiser.isClosed(),
                    fundraiser.getViews());
            fundraiserResponseList.add(fundraiserResponse);
        }
        return fundraiserResponseList;
    }
}
