import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../tournament.service';
import { NgForm } from '@angular/forms';
import { Tournament } from '../models/tournament';


@Component({
  selector: 'app-tournament-tracker',
  templateUrl: './tournament-tracker.component.html',
  styleUrls: ['./tournament-tracker.component.css']
})
export class TournamentTrackerComponent implements OnInit {

  oneTournament = null;
  listOfTournaments = [];
  allTournaments() {
    this.tournamentService.index().subscribe(
      data => {
        this.listOfTournaments = data;
      },
      error => console.log()
    );
  }

  showTournament(tourney: Tournament) {
    this.oneTournament = tourney;
  }

  displayTournament(id: Number) {
    this.tournamentService.getOne(id).subscribe(
      data => {

      },
      error => console.log(error)
    );
  }

  findTournament(keyword) {
    this.tournamentService.search(keyword).subscribe(
      data => {

      },
      error => console.log(error)
    );
  }
  addTournament(newTournament: NgForm) {
    const tournament: Tournament = newTournament.value;
    this.tournamentService.create(newTournament).subscribe(
      data => {

        newTournament.reset();
      },
      error => console.log(error)
    );
  }

  updateTournament(updateTournament: NgForm) {
    const newUpdateTournament: Tournament = updateTournament.value;
    this.tournamentService.update(updateTournament, newUpdateTournament.getId()).subscribe(
      data => {

        updateTournament.reset();
      },
      error => console.log(error)
    );
  }

  deleteTournament(id: Number) {
    this.tournamentService.delete(id).subscribe(
      data => {

      },
      error => console.log(error)
    );
  }

  averageWins() {
    this.tournamentService.getAverageWins().subscribe(
      data => {

      },
      error => console.log(error)
    );
  }

  averageLosses() {
    this.tournamentService.getAverageLosses().subscribe(
      data => {

      },
      error => console.log(error)
    );
  }

  totalLosses() {
    this.tournamentService.getTotalLosses().subscribe(
      data => {

      },
      error => console.log(error)
    );
  }
  totalDraws() {
    this.tournamentService.getTotalDraws().subscribe(
      data => {

      },
      error => console.log(error)
    );
  }
  totalWins() {
    this.tournamentService.getTotalWins().subscribe(
      data => {

      },
      error => console.log(error)
    );
  }

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.allTournaments();
  }

}
