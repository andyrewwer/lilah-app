import {loveBar} from '../components/drink-water-game/bathroom/lilah-stats/LilahStats'

export const sinkPosMaxRight = 33;
export const sinkPosMaxLeft = 19;
export const GAME_OVER_OUT_OF_TIME = 'GAME_OVER_OUT_OF_TIME';
export const GAME_OVER_LOVE_TOO_LOW = 'GAME_OVER_LOVE_TOO_LOW';
export const GAME_OVER_TOILET_TOO_HIGH = 'GAME_OVER_TOILET_TOO_HIGH';
export const GAME_OVER_GAME_WON = 'GAME_OVER_GAME_WON';
export const GAME_NOT_STARTED = 'GAME_NOT_STARTED';

class GameService {

// TODO Create a Lilah class that contains all these attributes
  constructor(loveCurrent, thirstQuenched, lilahPos, playerPos) {
    this.loveCurrent = loveCurrent;
    this.thirstQuenched = thirstQuenched;
    this.lilahPos = lilahPos;
    this.playerPos = playerPos;
    this.gameOver = false;
    this.gameStatus = GAME_NOT_STARTED;
    this.timeRemaining = 120;
    this.highScore = 120;
    this.debugMode = false;
    this.alert = 'none';
    this.debugMode = true;
    this.lilahAnimation = 'none';
    this.teethCurrent = 0;
    this.toiletCurrent = 0;
    this.lock = 0;
  }

  petLilah() {
    if (this.lock === 0) {
      if (Math.abs(this.playerPos - this.lilahPos) < 15) {
        this.loveCurrent += 6+Math.floor(Math.random() * 4);
        this.lilahAnimation = 'purr'+ Math.random();
        this.lock += 1.5;
        if (this.isLilahSad()) {
          this.loveCurrent += 10;
        }
      } else {
        this.alert = 'lilah-no-pet'
      }
    } else {
      console.log('locked out', this.lock)
    }
  }

  ignoreLilah() {
    this.loveCurrent -= 0.75;
    this.lilahPos -= 2.25;
  }

  talkToLilah() {
    this.lilahAnimation = 'coax'+ Math.random();
    this.loveCurrent += 0.65;
    // HARD CODED
    if (this.loveCurrent < 85) {
      if (this.lilahPos < this.playerPos) {
        this.lilahPos += 2.5;
      } else {
        this.lilahPos -= 2.5;
      }
    } else if (this.lilahPos >= (sinkPosMaxRight+sinkPosMaxLeft)/2) {
      this.lilahPos -= 0.75
    } else if (this.lilahPos <= (sinkPosMaxRight+sinkPosMaxLeft)/2) {
      this.lilahPos += 1.5
    }
  }

  movePlayer(moveLeft) {
    if (this.lock === 0) {
      this.playerPos = moveLeft ? this.playerPos - 3 : this.playerPos + 3
    }
    console.log(this.playerPos)
  }

  toiletAction() {
    if (this.lock === 0) {
      if (this.playerInFrontOfToilet()) {
        this.toiletCurrent += 7+Math.floor(Math.random() * 6);
        this.lock += 1.5;
      } else {
        this.alert = 'player-not-at-toilet'
      }
    }
  }

  brushTeeth() {
    if (this.lock === 0) {
      if (this.playerInFrontOfSink()) {
        this.teethCurrent += 5+Math.floor(Math.random() * 6);
        this.lock += 1.5;
      } else {
        this.alert = 'player-not-at-sink'
      }
    }
  }

  regularUpdate() {
    if (!this.gameOver && !this.debugMode) {
      this.updateLoveAndLilah();
      this.tryToDrinkWater();
      this.checkAndResetToMax();
      this.checkWinCondition();
      this.updateTimer();
    }
    return this.getState();
  }

  loveInTargetPosition() {
    let cur = 0;
    for (let i = 0; i < loveBar.thresholds.length; i ++) {
      const threshold = loveBar.thresholds[i];
      cur += threshold.size;
      if (this.loveCurrent <= cur) {
        return threshold.type === 'TARGET'
      }
    }
    return false
  }

  tryToDrinkWater() {
    if (this.lilahInFrontOfSink() && this.loveInTargetPosition()) {
      this.thirstQuenched += 3.5;
      this.lilahAnimation = 'drink'+ Math.random();
    }
  }

  checkWinCondition() {
    if (this.thirstQuenched > 99 && this.toiletCurrent > 68 && this.teethCurrent > 96) {
      this.endGame(GAME_OVER_GAME_WON);
    }
  }

  updateTimer() {
    this.timeRemaining -= 0.5;
    if (this.timeRemaining < 0) {
      this.endGame(GAME_OVER_OUT_OF_TIME);
    }
  }

  updateLoveAndLilah() {
    if (this.lock >= 0.5) {
      this.lock -= 0.5;
    }
    if (this.loveCurrent >= 80) {
      this.loveCurrent -= 0.2;
    } else if (this.loveCurrent >= 60) {
      this.loveCurrent -= 0.25;
    } else if (this.loveCurrent >= 44){
      this.loveCurrent -= 0.5;
    } else if (this.loveCurrent >= 20){
      this.loveCurrent -= 1;
      this.lilahPos -= 3;
    } else {
      this.lilahPos -= 5;
    }

    if (this.loveCurrent > 85) {
      if (this.lilahPos >= (sinkPosMaxRight+sinkPosMaxLeft)/2 ) {
        this.lilahPos -= 0.1
      }
      if (this.lilahPos <= (sinkPosMaxRight+sinkPosMaxLeft)/2) {
        this.lilahPos += 0.1
      }
    }

    if (this.loveCurrent < loveBar.thresholds[0].size) {
      if (this.lilahPos < 0) {
        this.endGame(GAME_OVER_LOVE_TOO_LOW);
        this.lilahPos = 0;
      }
      return
    }
    if (this.toiletCurrent > 91) {
      this.endGame(GAME_OVER_TOILET_TOO_HIGH);
    }
  }

  checkAndResetToMax() {
    if (this.lilahPos <= 1) {
      this.endGame(GAME_OVER_LOVE_TOO_LOW);
      return
    }
    if (this.loveCurrent > loveBar.max) {
      this.loveCurrent = loveBar.max;
    }
    if (this.lilahPos > 85) {
      this.lilahPos = 85;
    }
    if (this.lilahPos < 0) {
      this.lilahPos = 0;
    }
  }

  lilahInFrontOfSink() {
    return this.lilahPos > sinkPosMaxLeft && this.lilahPos < sinkPosMaxRight;
  }

  playerInFrontOfSink() {
    return this.playerPos > sinkPosMaxLeft && this.playerPos < sinkPosMaxRight;
  }
  playerInFrontOfToilet() {
    return this.playerPos > 66 && this.playerPos < 82;
  }

  isLilahSad() {
    return this.loveCurrent < 44;
  }

  endGame(status) {
    this.gameOver = true;
    this.gameStatus = status;
  }

  startNewGame(loveCurrent, thirstQuenched, lilahPos, playerPos) {
    this.loveCurrent = loveCurrent;
    this.thirstQuenched = thirstQuenched;
    this.lilahPos = lilahPos;
    this.playerPos = playerPos;
    this.gameOver = false;
    this.gameStatus = null;
    this.timeRemaining = 120;
    this.debugMode = false;
    this.teethCurrent = 0;
    this.toiletCurrent = 0;
  }

  setAlert(alert) {
    this.alert = alert;
  }

  setAnimation(lilahAnimation) {
    this.lilahAnimation = lilahAnimation;
  }

  getLilahAnimation() {
    return this.lilahAnimation;
  }

  getTimeRemaining() {
    return this.timeRemaining;
  }
  getState() {
    return {
      loveCurrent: this.loveCurrent,
      thirstQuenched: this.thirstQuenched,
      lilahPos: this.lilahPos,
      playerPos: this.playerPos,
      gameStatus: this.gameStatus,
      gameOver: this.gameOver,
      timeRemaining: this.timeRemaining,
      highScore: this.highScore,
      alert: this.alert,
      lilahAnimation: this.lilahAnimation,
      teethCurrent: this.teethCurrent,
      toiletCurrent: this.toiletCurrent,
      lock: this.lock
    }
  }

  calculateScore() {
    return (this.thirstQuenched + this.teethCurrent + this.toiletCurrent + this.timeRemaining/6).toFixed(0);
  }

}

export {GameService};
