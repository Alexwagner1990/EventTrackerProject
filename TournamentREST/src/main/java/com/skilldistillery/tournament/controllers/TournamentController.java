package com.skilldistillery.tournament.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/tournament")
public class TournamentController {

	@RequestMapping(path="ping", method=RequestMethod.GET)
	public String ping() {
		return "pong";
	}
}
