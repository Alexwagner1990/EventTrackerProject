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
  oneTournamentS = null;
  listOfTournaments = [];
  id = 0;
  updateModal = document.getElementById('updateModal');
  addModal = document.getElementById('addModal');
  updateModalClose = document.getElementById('closeButton');
  addModalClose = document.getElementById('closeButtonAdd');
  searchedTournaments = [];
  showSearch = false;
  showAddForm = false;
  showUpdateForm = false;
  allWins = 0;
  allLosses = 0;
  allDraws = 0;
  avgWins = 0;
  avgLosses = 0;
  searchKeyword: String = '';
  searchResults = false;


  allTournaments() {
    this.searchResults = false;
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
    this.searchResults = false;
  }

  // displayTournament(id: Number) {
  //   this.tournamentService.getOne(id).subscribe(
  //     data => {
  //       return data;
  //     },
  //     error => console.log(error)
  //   );
  // }
  toggleSearchView() {
      if (this.showSearch === false) {
        this.showSearch = true;
      } else {
        this.showSearch = false;
      }
  }
  findTournament() {
    this.oneTournament = null;
    this.listOfTournaments = [];
    this.searchedTournaments = [];
    this.tournamentService.search(this.searchKeyword).subscribe(
      data => {
        if (data.length > 0) {
          this.searchResults = true;
          this.searchKeyword = '';
          this.searchedTournaments = data;
        } else {
          this.searchKeyword = '';
          this.searchedTournaments = null;
        }
      },
      error => console.log(error)
    );
  }
  toggleAddView() {
    if (this.showAddForm === false) {
      this.showAddForm = true;
    } else {
      this.showAddForm = false;
    }
  }
  // COME BACK WHEN JQUERY WORKS
  // showAddModal() {
  //   this.addModal.setAttribute('style', 'display = block');
  // }

  // closeAddModal() {
  //   this.addModal.setAttribute('style', 'display = none');
  // }

  addTournament(newTournament: NgForm) {
    const tournament: Tournament = newTournament.value;
    console.log(tournament.roundsDrawn);
    if (tournament.name == null || tournament.name === '') {
      tournament.name = 'Default';
    }
    if (tournament.roundsDrawn == null || tournament.roundsDrawn === undefined) {
      tournament.roundsDrawn = 0;
    }
    if (tournament.roundsWon == null || tournament.roundsWon === undefined) {
      tournament.roundsWon = 0;
    }
    if (tournament.roundsLost == null || tournament.roundsLost === undefined) {
      tournament.roundsLost = 0;
    }
    this.tournamentService.create(tournament).subscribe(
      data => {
        this.allTournaments();
        this.searchResults = false;
        this.totalWins();
        this.totalLosses();
        this.totalDraws();
        this.averageWins();
        this.averageLosses();
        newTournament.reset();
        this.toggleAddView();
      },
      error => console.log(error)
    );
  }

  toggleUpdateView() {
    if (this.showUpdateForm === false) {
      this.showUpdateForm = true;
      this.oneTournamentS = this.oneTournament;
    } else {
      this.showUpdateForm = false;
      this.oneTournamentS = null;
    }
  }

  // COME BACK WHEN JQUERY WORKS
  // showUpdateModal(id) {
  //   this.id = id;
  //   this.updateModal.setAttribute('style', 'display = block');
  // }

  // closeUpdateModal() {
  //   this.id = 0;
  //   this.updateModal.setAttribute('style', 'display = none');
  // }

  updateTournament() {
    this.tournamentService.update(this.oneTournament, this.oneTournament.id).subscribe(
      data => {
        this.searchResults = false;
        this.allTournaments();

        this.totalWins();
        this.totalLosses();
        this.totalDraws();
        this.averageWins();
        this.averageLosses();
        this.oneTournament = null;
        this.toggleUpdateView();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTournament() {
    this.tournamentService.delete(this.oneTournament.id).subscribe(
      data => {
        this.allTournaments();
        this.totalWins();
        this.totalLosses();
        this.totalDraws();
        this.averageWins();
        this.averageLosses();        this.oneTournament = null;
        this.searchResults = false;
      },
      error => console.log(error)
    );
  }

  averageWins() {
    this.tournamentService.getAverageWins().subscribe(
      data => {
        this.avgWins = data;
      },
      error => console.log(error)
    );
  }

  averageLosses() {
    this.tournamentService.getAverageLosses().subscribe(
      data => {
        this.avgLosses = data;
      },
      error => console.log(error)
    );
  }

  totalLosses() {
    this.tournamentService.getTotalLosses().subscribe(
      data => {
        this.allLosses = data;
      },
      error => console.log(error)
    );
  }
  totalDraws() {
    this.tournamentService.getTotalDraws().subscribe(
      data => {
        this.allDraws = data;
      },
      error => console.log(error)
    );
  }
  totalWins() {
    this.tournamentService.getTotalWins().subscribe(
      data => {
        this.allWins = data;
      },
      error => console.log(error)
    );
  }

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.allTournaments();
    this.averageWins();
    this.totalDraws();
    this.totalLosses();
    this.totalWins();
    this.averageLosses();
    // TRY THIS WHEN JQUERY WORKS
    // this.closeUpdateModal();
    // this.closeAddModal();
  }

}
