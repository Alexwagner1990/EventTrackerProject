package com.skilldistillery.tournament.tests;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.skilldistillery.tournament.entities.Tournament;

public class TournamentTest {

	private Tournament tournament;
	private EntityManagerFactory emf;
	private EntityManager em;
	
	@Before
	public void setup() {
		emf = Persistence.createEntityManagerFactory("Tournament");
		em = emf.createEntityManager();
		tournament = new Tournament();
	}
	@After
	public void teardown() {
		em.close();
		emf.close();
	}
	
	
	@Test
	public void test_tournament_crud() {
		tournament = em.find(Tournament.class, 1);
		assertEquals("Weekend Tournament", tournament.getName());
	}
}
