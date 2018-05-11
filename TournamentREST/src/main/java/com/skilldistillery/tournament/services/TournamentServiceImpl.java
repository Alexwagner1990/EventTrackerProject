package com.skilldistillery.tournament.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.tournament.repositories.TournamentRepository;

@Service
public class TournamentServiceImpl implements TournamentService {

	@Autowired
	private TournamentRepository tournamentRepo;
	
	
}
