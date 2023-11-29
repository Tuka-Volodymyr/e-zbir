package com.ua.ezbir.domain;

import com.ua.ezbir.services.impl.FundraiserServiceImpl;
import com.ua.ezbir.web.fundraiser.Category;
import com.ua.ezbir.web.fundraiser.FundraiserDto;
import com.ua.ezbir.web.fundraiser.FundraiserResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
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
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> cards;
//    private long rating;
    public FundraiserDto toFundraiserDto(){
        return FundraiserDto.builder()
                .jarLink(getJarLink())
                .name(getName())
                .description(getDescription())
                .categories(getCategories())
                .cards(getCards())
                .build();
    }
    public static List<FundraiserResponse> toListOfFundraiserResponse(List<Fundraiser> fundraiserList){
        List<FundraiserResponse> fundraiserResponseList=new ArrayList<>();
        Collections.sort(fundraiserList, Comparator.comparing(Fundraiser::getCurrentDateTime).reversed());

        for(Fundraiser fundraiser:fundraiserList){
            FundraiserResponse fundraiserResponse=new FundraiserResponse(
                    fundraiser.getFundraiserId(),
                    fundraiser.getName(),
                    fundraiser.getJarLink(),
                    fundraiser.getDescription(),
                    fundraiser.getCurrentDateTime(),
                    fundraiser.getCategories(),
                    fundraiser.getCards(),
                    fundraiser.isClosed());
            fundraiserResponseList.add(fundraiserResponse);
        }
        return fundraiserResponseList;
    }
}
