package com.vinod.stickies.controller;

import com.vinod.stickies.entity.Stickies;
import com.vinod.stickies.service.StickyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
public class StickiesController {
    StickyService stickyService;

    @Autowired
    public StickiesController(StickyService stickyService) {
        this.stickyService = stickyService;
    }

    @GetMapping("/stickies")
    public ResponseEntity<List<Stickies>> findAll(){
        return new ResponseEntity<>(stickyService.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/stickies/{stickyId}")
    public ResponseEntity<Stickies> getSticky(@PathVariable int stickyId){
        Stickies stickies = stickyService.findById(stickyId);
        if(stickies == null){
            throw  new RuntimeException("Sticky id not found - " + stickyId);
        }
        return new ResponseEntity<>(stickies, HttpStatus.OK);
    }

    @PostMapping("/stickies")
    public ResponseEntity<Stickies> addSticky(@RequestBody Stickies stickies){
        stickies.setId(0);
        return new ResponseEntity<>(stickyService.save(stickies), HttpStatus.OK);
    }

    @PutMapping("/stickies")
    public ResponseEntity<Stickies> updateSticky(@RequestBody Stickies stickies){
        return new ResponseEntity<>(stickyService.save(stickies), HttpStatus.OK);
    }

    @DeleteMapping("/stickies/{stickyId}")
    public ResponseEntity<String> deleteSticky(@PathVariable int stickyId){
        Stickies stickies = stickyService.findById(stickyId);
        if(stickies == null){
            throw new RuntimeException("Sticky id not found - " + stickyId);
        }
        stickyService.deleteById(stickyId);
        return new ResponseEntity<>("Sticky with id = " + stickyId +  " successfully deleted", HttpStatus.OK);
    }    
}
