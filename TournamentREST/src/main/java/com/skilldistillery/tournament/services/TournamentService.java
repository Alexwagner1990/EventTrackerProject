package com.skilldistillery.tournament.services;

import java.util.List;

import com.skilldistillery.tournament.entities.Tournament;

public interface TournamentService {

	public List<Tournament> getAllTournaments();
	public Tournament createTournament(Tournament tournament);
	public Boolean deleteTournament(int id);
	public Tournament editTournament(Tournament tournament, int id);
	public List<Tournament> findTournamentByKeyword(String keyword);
}
