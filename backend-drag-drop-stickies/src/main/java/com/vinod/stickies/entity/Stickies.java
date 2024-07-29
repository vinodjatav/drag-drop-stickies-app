package com.vinod.stickies.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "stickies")
@NoArgsConstructor
@Data
public class Stickies {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @JsonProperty("body")
    @Column(name = "body")
    private String body;

    @JsonProperty("colors")
    @Column(name = "colors")
    private String colors;

    @JsonProperty("position")
    @Column(name = "position")
    private String position;

    public Stickies(String body, String colors, String position) {
        this.body = body;
        this.colors = colors;
        this.position = position;
    }
}
