package com.skilldistillery.tournament.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Tournament {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
//	PUT THIS BACK IN WHEN YOU FIGURE OUT JACKSON DEPENDANCY
//	@Temporal(TemporalType.DATE)
//	@Column(name="start_date")
//	private Date startDate;
	@Column(name="rounds_won")
	private Integer roundsWon;
	@Column(name="rounds_lost")
	private Integer roundsLost;
	@Column(name="rounds_drawn")
	private Integer roundsDrawn;
	private Integer place;
	private String type;
	@Column(name="total_players")
	private Integer totalPlayers;
	private String description;
	
	public Tournament() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

// PUT THIS BACK IN WHEN YOU FIGURE OUT JACKSON DEPENDANCY
//	public Date getStartDate() {
//		return startDate;
//	}
//
//	public void setStartDate(Date startDate) {
//		this.startDate = startDate;
//	}

	public Integer getRoundsWon() {
		return roundsWon;
	}

	public void setRoundsWon(Integer roundsWon) {
		this.roundsWon = roundsWon;
	}

	public Integer getRoundsLost() {
		return roundsLost;
	}

	public void setRoundsLost(Integer roundsLost) {
		this.roundsLost = roundsLost;
	}

	public Integer getRoundsDrawn() {
		return roundsDrawn;
	}

	public void setRoundsDrawn(Integer roundsDrawn) {
		this.roundsDrawn = roundsDrawn;
	}

	public Integer getPlace() {
		return place;
	}

	public void setPlace(Integer place) {
		this.place = place;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getTotalPlayers() {
		return totalPlayers;
	}

	public void setTotalPlayers(Integer totalPlayers) {
		this.totalPlayers = totalPlayers;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	
	
}
