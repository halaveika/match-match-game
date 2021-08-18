export class ScoreCounter {
  turns: number;

  badTurns: number;

  time: number;

  score: number;

  gameDifficult: number;

  constructor() {
    this.turns = 0;
    this.badTurns = 0;
    this.time = 0;
    this.score = 0;
    this.gameDifficult = 16;
  }

  count = (): number => {
    this.score = (this.turns - this.badTurns) * 100 - this.time * 10;
    if (this.score < 0) {
      this.score = 0;
      return this.score;
    }
    return this.score;
  };
}
