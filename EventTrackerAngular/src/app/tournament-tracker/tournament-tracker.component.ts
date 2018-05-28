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
  id = 0;
  updateModal = document.getElementById('updateModal');
  addModal = document.getElementById('addModal');
  updateModalClose = document.getElementById('closeButton');
  addModalClose = document.getElementById('closeButtonAdd');
  searchedTournaments = [];


  allTournaments() {
    this.oneTournament = null;
    this.searchedTournaments = [];
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

  // displayTournament(id: Number) {
  //   this.tournamentService.getOne(id).subscribe(
  //     data => {
  //       return data;
  //     },
  //     error => console.log(error)
  //   );
  // }

  findTournament(keyword) {
    this.searchedTournaments = [];
    this.tournamentService.search(keyword).subscribe(
      data => {
        if (data.length > 0) {
          this.searchedTournaments = data;
        } else {
          this.searchedTournaments = null;
        }
      },
      error => console.log(error)
    );
  }

  showAddModal() {
    this.addModal.setAttribute('style', 'display = block');
  }

  closeAddModal() {
    this.addModal.setAttribute('style', 'display = none');
  }

  addTournament(newTournament: NgForm) {
    const tournament: Tournament = newTournament.value;
    this.tournamentService.create(newTournament).subscribe(
      data => {
        newTournament.reset();
        this.allTournaments();
      },
      error => console.log(error)
    );
  }

  showUpdateModal(id) {
    this.id = id;
    this.updateModal.setAttribute('style', 'display = block');
  }

  closeUpdateModal() {
    this.id = 0;
    this.updateModal.setAttribute('style', 'display = none');
  }

  updateTournament(updateTournament: NgForm) {
    const newUpdateTournament: Tournament = updateTournament.value;
    this.tournamentService.update(updateTournament, newUpdateTournament.getId()).subscribe(
      data => {
        updateTournament.reset();
        this.allTournaments();
      },
      error => console.log(error)
    );
  }

  deleteTournament(id: Number) {
    this.tournamentService.delete(id).subscribe(
      data => {
        this.allTournaments();
      },
      error => console.log(error)
    );
  }

  averageWins() {
    this.tournamentService.getAverageWins().subscribe(
      data => {
        return data;
      },
      error => console.log(error)
    );
  }

  averageLosses() {
    this.tournamentService.getAverageLosses().subscribe(
      data => {
        return data;
      },
      error => console.log(error)
    );
  }

  totalLosses() {
    this.tournamentService.getTotalLosses().subscribe(
      data => {
        return data;
      },
      error => console.log(error)
    );
  }
  totalDraws() {
    this.tournamentService.getTotalDraws().subscribe(
      data => {
        return data;
      },
      error => console.log(error)
    );
  }
  totalWins() {
    this.tournamentService.getTotalWins().subscribe(
      data => {
        return data;
      },
      error => console.log(error)
    );
  }

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.allTournaments();
    this.closeUpdateModal();
    this.closeAddModal();
  }

}
