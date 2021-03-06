export class Tournament {
  id: number;
  name: string;
  startDate: Date;
  roundsWon: number;
  roundsLost: number;
  roundsDrawn: number;
  place: number;
  type: string;
  totalPlayers: number;
  description: string;

  getId() {
    return this.id;
  }

  getStartDate() {
    return this.startDate;
  }

  constructor(id?: number, name?: string, startDate?: Date, roundsWon?: number, roundsLost?: number,
  roundsDrawn?: number, place?: number, type?: string, totalPlayers?: number, description?: string) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.roundsWon = roundsWon;
    this.roundsLost = roundsLost;
    this.roundsDrawn = roundsDrawn;
    this.place = place;
    this.type = type;
    this.totalPlayers = totalPlayers;
    this.description = description;

  }
}
