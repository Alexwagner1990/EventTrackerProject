package com.skilldistillery.tournament.services;

import java.util.List;

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
	
	
	
}
