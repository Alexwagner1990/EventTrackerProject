package com.skilldistillery.tournament.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.tournament.entities.Tournament;

public interface TournamentRepository extends JpaRepository<Tournament, Integer>{

}
