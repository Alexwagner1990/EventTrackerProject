package com.skilldistillery.tournament.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.tournament.entities.Tournament;

public interface TournamentRepository extends JpaRepository<Tournament, Integer>{

	public List<Tournament> findByNameLikeOrTypeLikeOrDescriptionLike(String keyword, String keywordAlso, String keywordSame);
}
