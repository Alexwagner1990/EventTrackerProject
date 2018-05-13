package com.skilldistillery.tournament.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.tournament.entities.Tournament;
import com.skilldistillery.tournament.repositories.TournamentRepository;

@Service
public class TournamentServiceImpl implements TournamentService {

	@Autowired
	private TournamentRepository tournamentRepo;

	@Override
	public List<Tournament> getAllTournaments() {
		return tournamentRepo.findAll();
	}

	@Override
	public Tournament createTournament(Tournament tournament) {
		return tournamentRepo.saveAndFlush(tournament);
	}

	@Override
	public Boolean deleteTournament(int id) {
		 try {
			tournamentRepo.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public Tournament editTournament(Tournament tournament, int id) {
		Tournament managedTournament = tournamentRepo.findById(tournament.getId()).get();
		if(managedTournament.getId() != id) {
			return null;
		}
		
		if(tournament.getName() != null && !tournament.getName().equals("")) {
			managedTournament.setName(tournament.getName());
		}
		if(tournament.getStartDate() != null) {
			managedTournament.setStartDate(tournament.getStartDate());
		}
		if(tournament.getRoundsWon() != null) {
			managedTournament.setRoundsWon(tournament.getRoundsWon());
		}
		if(tournament.getRoundsDrawn() != null) {
			managedTournament.setRoundsDrawn(tournament.getRoundsDrawn());
		}
		if(tournament.getRoundsLost() != null) {
			managedTournament.setRoundsLost(tournament.getRoundsLost());
		}
		if(tournament.getPlace() != null) {
			managedTournament.setPlace(tournament.getPlace());
		}
		if(tournament.getType() != null && !tournament.getType().equals("")) {
			managedTournament.setType(tournament.getType());
		}
		if(tournament.getTotalPlayers() != null) {
			managedTournament.setTotalPlayers(tournament.getTotalPlayers());
		}
		if(tournament.getDescription() != null && !tournament.getDescription().equals("")) {
			managedTournament.setDescription(tournament.getDescription());
		}
		tournamentRepo.saveAndFlush(managedTournament);
		return managedTournament;
	}

	@Override
	public List<Tournament> findTournamentByKeyword(String keyword) {
		String sqlKeyword = "%" + keyword + "%";
		return tournamentRepo.findByNameLikeOrTypeLikeOrDescriptionLike(sqlKeyword, sqlKeyword, sqlKeyword);
	}

	@Override
	public Tournament getTournamentById(int id) {
		Optional<Tournament> ifFound = tournamentRepo.findById(id);
		if(ifFound.isPresent()) {
			return ifFound.get();
		}
		return null;
	}

	@Override
	public List<Tournament> findTournamentInTimePeriod(Date state, Date end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer getTotalWins() {
		List<Tournament> allTourneys = tournamentRepo.findAll();
		Integer wins = 0;
		for (Tournament tournament : allTourneys) {
			wins += tournament.getRoundsWon();
		}
		return wins;
	}

	@Override
	public Integer getTotalLosses() {
		List<Tournament> allTourneys = tournamentRepo.findAll();
		Integer losses = 0;
		for (Tournament tournament : allTourneys) {
			losses += tournament.getRoundsLost();
		}
		return losses;
	}

	@Override
	public Integer getTotalDraws() {
		List<Tournament> allTourneys = tournamentRepo.findAll();
		Integer draws = 0;
		for (Tournament tournament : allTourneys) {
			draws += tournament.getRoundsDrawn();
		}
		return draws;
	}

	@Override
	public Double getAverageWins() {
		List<Tournament> allTourneys = tournamentRepo.findAll();
		Integer wins = 0;
		Double average = 0.00;
		for (Tournament tournament : allTourneys) {
			wins += tournament.getRoundsWon();
		}		
		if(allTourneys.size()>0) {
			average = (double)Math.round((100*wins/allTourneys.size()))/100;
		}
		return average;
	}

	@Override
	public Double getAverageLosses() {
		List<Tournament> allTourneys = tournamentRepo.findAll();
		Integer losses = 0;
		Double average = 0.00;
		for (Tournament tournament : allTourneys) {
			losses += tournament.getRoundsLost();
		}		
		if(allTourneys.size()>0) {
			average = (double)Math.round((100*losses/allTourneys.size()))/100;
		}
		return average;
	}
	
	
	
}
