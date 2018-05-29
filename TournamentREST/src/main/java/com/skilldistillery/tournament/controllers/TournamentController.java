package com.skilldistillery.tournament.controllers;

import java.util.List;
import java.sql.Date;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.tournament.entities.Tournament;
import com.skilldistillery.tournament.services.TournamentService;

@RestController
@RequestMapping("api/tournament")
@CrossOrigin({"*", "http://localhost:4200"})
public class TournamentController {

	@Autowired
	private TournamentService tournamentService;
	
	@RequestMapping(path="ping", method=RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	@RequestMapping(path="all", method=RequestMethod.GET)
	public List<Tournament> index(){
		return tournamentService.getAllTournaments(); 
	}
	
	@RequestMapping(path="new", method=RequestMethod.POST)
	public Tournament createTournament(@RequestBody Tournament tournament, HttpServletResponse resp){
		Tournament createdTournament = tournamentService.createTournament(tournament);
		if(createdTournament != null) {
			resp.setStatus(201);
			return createdTournament;
		}
		else {
			resp.setStatus(500);
			return null;
		}
	}
	
	@RequestMapping(path="delete/{id}", method=RequestMethod.DELETE)
	public Boolean deleteTournament(@PathVariable int id, HttpServletResponse resp){
		Boolean success = tournamentService.deleteTournament(id); 
		if(success) {
			resp.setStatus(202);
			return success;
		}
		else {
			resp.setStatus(406);
			return success;
		}
	}
	
	@RequestMapping(path="update/{id}", method=RequestMethod.PATCH)
	public Tournament updateTournament(@RequestBody Tournament tournament, @PathVariable int id){
		return tournamentService.editTournament(tournament, id); 
	}
	
	@RequestMapping(path="search/{keyword}", method=RequestMethod.GET)
	public List<Tournament> findTournamentByKeyword(@PathVariable String keyword){
		return tournamentService.findTournamentByKeyword(keyword); 
	}
	
	@RequestMapping(path="{id}", method=RequestMethod.GET)
	public Tournament getTournamentById(@PathVariable int id){
		return tournamentService.getTournamentById(id); 
	}
	
	@RequestMapping(path="average/wins", method=RequestMethod.GET)
	public Double getAverageWins() {
		return tournamentService.getAverageWins();
	}
	
	@RequestMapping(path="average/losses", method=RequestMethod.GET)
	public Double getAverageLosses() {
		return tournamentService.getAverageLosses();
	}
	
	@RequestMapping(path="all/wins", method=RequestMethod.GET)
	public Integer getWins() {
		return tournamentService.getTotalWins();
	}
	
	@RequestMapping(path="all/losses", method=RequestMethod.GET)
	public Integer getLosses() {
		return tournamentService.getTotalLosses();
	}
	
	@RequestMapping(path="all/draws", method=RequestMethod.GET)
	public Integer getDraws() {
		return tournamentService.getTotalDraws();
	}
}
