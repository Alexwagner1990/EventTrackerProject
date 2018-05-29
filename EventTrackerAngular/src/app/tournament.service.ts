import { Tournament } from './models/tournament';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {catchError} from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private baseUrl = '/TournamentREST/';
  // OLD private url = 'http://localhost:8080/api/tournament/';
  private url = this.baseUrl + 'api/tournament/';

  ping() {
    return this.http.get<String>(`${this.url}ping`).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    );
  }
  index() {
    return this.http.get<Tournament[]>(`${this.url}all`).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  create(tournament) {
    console.log(tournament);
    return this.http.post<Tournament>(`${this.url}new`, tournament).pipe(
      catchError((err) => {
      console.log(err);
      return throwError(err);
      })
    );
  }

  update(tournament, id) {
    return this.http.patch<Tournament>(`${this.url}update/${id}`, tournament).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
        })
    );
  }

  delete(id) {
    return this.http.delete(`${this.url}delete/${id}`, id).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
        })
    );
  }

  search(keyword) {
    return this.http.get<Tournament[]>(`${this.url}search/${keyword}`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
        })
    );
  }

  getOne(id) {
    return this.http.get<Tournament>(`${this.url}${id}`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
        })
    );
  }

  getAverageWins() {
    return this.http.get<number>(`${this.url}average/wins`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
        })
    );
  }

  getAverageLosses() {
    return this.http.get<number>(`${this.url}average/losses`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
        })
    );
  }

  getTotalWins() {
    return this.http.get<number>(`${this.url}all/wins`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
        })
    );
  }

  getTotalLosses() {
    return this.http.get<number>(`${this.url}all/losses`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
        })
    );
  }
  getTotalDraws() {
    return this.http.get<number>(`${this.url}all/draws`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
        })
    );
  }

  constructor(private http: HttpClient,
    private datepipe: DatePipe) { }
}
