package com.vinod.stickies.service;

import com.vinod.stickies.entity.Stickies;
import com.vinod.stickies.repo.StickyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StickyService {
    StickyRepository stickyRepository;

    @Autowired
    public StickyService(StickyRepository stickyRepository) {
        this.stickyRepository = stickyRepository;
    }

    public Stickies findById(int id){
        Optional<Stickies> result = stickyRepository.findById(id);
        Stickies sticky = null;
        if(result.isPresent()){
            sticky = result.get();
        }else {
            throw new RuntimeException("Did not found sticky id - " + id);
        }
        return sticky;
    }

    public List<Stickies> findAll() {
        return stickyRepository.findAll();
    }

    public Stickies save(Stickies employee) {
        return stickyRepository.save(employee);
    }

    public void deleteById(int id) {
        stickyRepository.deleteById(id);
    }
}
