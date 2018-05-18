package com.skilldistillery.tournament.services;

import java.sql.Date;
import java.util.List;

import com.skilldistillery.tournament.entities.Tournament;

public interface TournamentService {

	public Tournament getTournamentById(int id);
	public List<Tournament> getAllTournaments();
	public Tournament createTournament(Tournament tournament);
	public Boolean deleteTournament(int id);
	public Tournament editTournament(Tournament tournament, int id);
	public List<Tournament> findTournamentByKeyword(String keyword);
	public List<Tournament> findTournamentInTimePeriod(Date state, Date end);
	public Integer getTotalWins();
	public Integer getTotalLosses();
	public Integer getTotalDraws();
	public Double getAverageWins();
	public Double getAverageLosses();
}
