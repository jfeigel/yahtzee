import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import * as _ from 'lodash';

import { Die } from '../shared/die';
import { Category } from '../shared/category';
import { DialogData } from '../shared/dialog-data';

import { EndDialogComponent } from '../end-dialog/end-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  dice: Die[] = [
    new Die(),
    new Die(),
    new Die(),
    new Die(),
    new Die()
  ];
  score = 0;
  roll = 0;
  currentHighScore;

  categories: Category[] = [
    {
      pointsPossible: 5,
      pointsCollected: 0,
      title: 'Ones',
      used: false,
      calculate: () => {
        const index = _.findIndex(this.categories, ['title', 'Ones']);
        this.categories[index].used = true;
        const results = _.countBy(this.dice, 'number');
        if (results[1]) {
          const score = results[1];
          this.categories[index].pointsCollected = score;
          this.score += score;
        }
        this._resetDice();
      }
    },
    {
      pointsPossible: 10,
      pointsCollected: 0,
      title: 'Twos',
      used: false,
      calculate: () => {
        const index = _.findIndex(this.categories, ['title', 'Twos']);
        this.categories[index].used = true;
        const results = _.countBy(this.dice, 'number');
        if (results[2]) {
          const score = results[2] * 2;
          this.categories[index].pointsCollected = score;
          this.score += score;
        }
        this._resetDice();
      }
    },
    {
      pointsPossible: 15,
      pointsCollected: 0,
      title: 'Threes',
      used: false,
      calculate: () => {
        const index = _.findIndex(this.categories, ['title', 'Threes']);
        this.categories[index].used = true;
        const results = _.countBy(this.dice, 'number');
        if (results[3]) {
          const score = results[3] * 3;
          this.categories[index].pointsCollected = score;
          this.score += score;
        }
        this._resetDice();
      }
    },
    {
      pointsPossible: 20,
      pointsCollected: 0,
      title: 'Fours',
      used: false,
      calculate: () => {
        const index = _.findIndex(this.categories, ['title', 'Fours']);
        this.categories[index].used = true;
        const results = _.countBy(this.dice, 'number');
        if (results[4]) {
          const score = results[4] * 4;
          this.categories[index].pointsCollected = score;
          this.score += score;
        }
        this._resetDice();
      }
    },
    {
      pointsPossible: 25,
      pointsCollected: 0,
      title: 'Fives',
      used: false,
      calculate: () => {
        const index = _.findIndex(this.categories, ['title', 'Fives']);
        this.categories[index].used = true;
        const results = _.countBy(this.dice, 'number');
        if (results[5]) {
          const score = results[5] * 5;
          this.categories[index].pointsCollected = score;
          this.score += score;
        }
        this._resetDice();
      }
    },
    {
      pointsPossible: 30,
      pointsCollected: 0,
      title: 'Sixes',
      used: false,
      calculate: () => {
        const index = _.findIndex(this.categories, ['title', 'Sixes']);
        this.categories[index].used = true;
        const results = _.countBy(this.dice, 'number');
        if (results[6]) {
          const score = results[6] * 6;
          this.categories[index].pointsCollected = score;
          this.score += score;
        }
        this._resetDice();
      }
    },
    {
      pointsPossible: null,
      pointsCollected: null,
      title: null,
      used: true,
      calculate: () => {
        return;
      }
    },
    {
      pointsPossible: 30,
      pointsCollected: 0,
      title: '3 of a Kind',
      used: false,
      calculate: () => {
        const index = _.findIndex(this.categories, ['title', '3 of a Kind']);
        this.categories[index].used = true;
        const results = _.countBy(this.dice, 'number');
        const values = _.values(results);
        if (values.indexOf(3) === -1 && values.indexOf(4) === -1) {
          this._resetDice();
          return;
        }
        const score = _.sumBy(this.dice, 'number');
        this.categories[index].pointsCollected = score;
        this.score += score;
        this._resetDice();
      }
    },
    {
      pointsPossible: 30,
      pointsCollected: 0,
      title: '4 of a Kind',
      used: false,
      calculate: () => {
        const index = _.findIndex(this.categories, ['title', '4 of a Kind']);
        this.categories[index].used = true;
        const results = _.countBy(this.dice, 'number');
        const values = _.values(results);
        if (values.indexOf(4) === -1) {
          this._resetDice();
          return;
        }
        const score = _.sumBy(this.dice, 'number');
        this.categories[index].pointsCollected = score;
        this.score += score;
        this._resetDice();
      }
    },
    {
      pointsPossible: 25,
      pointsCollected: 0,
      title: 'Full House',
      used: false,
      calculate: () => {
        const index = _.findIndex(this.categories, ['title', 'Full House']);
        this.categories[index].used = true;
        const results = _.countBy(this.dice, 'number');
        const values = _.values(results);

        if (values.length === 2 && ((values[0] === 2 && values[1] === 3) || (values[0] === 3 && values[1] === 2))) {
          const score = this.categories[index].pointsPossible;
          this.categories[index].pointsCollected = score;
          this.score += score;
        }

        this._resetDice();
      }
    },
    {
      pointsPossible: 30,
      pointsCollected: 0,
      title: 'Small Straight',
      used: false,
      calculate: () => {
        const index = _.findIndex(this.categories, ['title', 'Small Straight']);
        this.categories[index].used = true;
        const results = _.map(this.dice, 'number');
        if (
          _.intersection(results, [1, 2, 3, 4]).length === 4 ||
          _.intersection(results, [2, 3, 4, 5]).length === 4 ||
          _.intersection(results, [3, 4, 5, 6]).length === 4
        ) {
          const score = this.categories[index].pointsPossible;
          this.categories[index].pointsCollected = score;
          this.score += score;
        }
        this._resetDice();
      }
    },
    {
      pointsPossible: 40,
      pointsCollected: 0,
      title: 'Large Straight',
      used: false,
      calculate: () => {
        const index = _.findIndex(this.categories, ['title', 'Large Straight']);
        this.categories[index].used = true;
        const results = _.map(this.dice, 'number');
        if (
          _.intersection(results, [1, 2, 3, 4, 5]).length === 5 ||
          _.intersection(results, [2, 3, 4, 5, 6]).length === 5
        ) {
          const score = this.categories[index].pointsPossible;
          this.categories[index].pointsCollected = score;
          this.score += score;
        }
        this._resetDice();
      }
    },
    {
      pointsPossible: 30,
      pointsCollected: 0,
      title: 'Chance',
      used: false,
      calculate: () => {
        const score = _.sumBy(this.dice, 'number');
        const index = _.findIndex(this.categories, ['title', 'Chance']);
        this.categories[index].pointsCollected = score;
        this.categories[index].used = true;
        this.score += score;
        this._resetDice();
      }
    },
    {
      pointsPossible: 50,
      pointsCollected: 0,
      title: 'Yahtzee',
      used: false,
      calculate: () => {
        const index = _.findIndex(this.categories, ['title', 'Yahtzee']);
        if (_.uniqBy(this.dice, 'number').length !== 1) {
          this.categories[index].used = true;
          this._resetDice();
          return;
        }

        if (this.categories[index].pointsCollected !== 0) {
          this.categories[index].pointsCollected += 100;
          this.score += 100;
        } else {
          this.categories[index].pointsCollected += 50;
          this.categories[index].used = true;
          this.score += 50;
        }
        this._resetDice();
      }
    }
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.currentHighScore = parseInt(localStorage.getItem('highScore'), 10) || 0;
  }

  public rollDie(dieNumber: number): void {
    if (!dieNumber) {
      this.roll++;
      this.dice.forEach((die) => {
        if (!die.held) {
          let number = 0;
          const interval = setInterval(() => {
            die.number = (number % 6) + 1;
            number++;
          }, 25);
          setTimeout(() => {
            clearInterval(interval);
            die.number = this._getRand();
          }, 1000);
        }
      });
    } else {
      this.dice[dieNumber].number = this._getRand();
    }
  }

  public resetGame(): void {
    this.currentHighScore = localStorage.getItem('highScore');
    this.categories.forEach((category) => {
      category.used = false;
      category.pointsCollected = 0;
    });
    this.score = 0;
    this._resetDice();
  }

  private _getRand(): number {
    return Math.floor(Math.random() * 6 + 1);
  }

  private _resetDice(): void {
    this.roll = 0;
    this.dice.forEach(die => {
      die.held = false;
      die.number = null;
    });
    if (_.every(this.categories, 'used')) {
      this._finish();
    }
  }

  private _finish(): void {
    const upperScore = _.chain(this.categories).slice(0, 6).sumBy('pointsCollected').value();
    if (upperScore >= 63) {
      this.score += 35;
    }
    if (this.score > this.currentHighScore) {
      localStorage.setItem('highScore', `${this.score}`);
    }

    const dialogData: DialogData = {
      score: this.score,
      highScore: this.currentHighScore
    };

    const dialogRef = this.dialog.open(EndDialogComponent, {
      data: dialogData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.resetGame();
    });
  }

}
