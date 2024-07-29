package com.vinod.stickies.repo;

import com.vinod.stickies.entity.Stickies;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StickyRepository extends JpaRepository<Stickies, Integer> {
}
