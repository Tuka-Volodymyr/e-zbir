package com.ua.ezbir.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ua.ezbir.web.user.UserResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    private String email;
    private String fullName;
    private String password;
    private String infoAboutYourself;
    private String photoUrl;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "user")
    @JsonManagedReference
    private List<Fundraiser> fundraiserList;
    private LocalDateTime currentDateTime;
    @Column(columnDefinition = "bigint default 0")
    private long views = 0;

    public static UserResponse userToUserResponseWithToken(User user, String token){
        return new UserResponse(
                user.getUser_id(),
                user.getFullName(),
                user.getInfoAboutYourself(),
                user.getPhotoUrl(),
                user.getFundraiserList(),
                token,
                user.getViews());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Реалізація отримання ролей (GrantedAuthority)
        // ...
        return null;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
