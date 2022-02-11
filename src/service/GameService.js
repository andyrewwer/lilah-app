import {loveBar} from '../components/drink-water-game/bathroom/lilah-stats/LilahStats'

export const maxTargetLilah = 33;
export const minTargetLilah = 19;
export const minLilahPetRange = 58;
export const GAME_OVER_OUT_OF_TIME = 'GAME_OVER_OUT_OF_TIME';
export const GAME_OVER_LOVE_TOO_LOW = 'GAME_OVER_LOVE_TOO_LOW';
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
  }

  petLilah() {
    if (Math.abs(this.playerPos - this.lilahPos) < 15) {
      this.loveCurrent += 3;
      this.lilahAnimation = 'purr'+ Math.random();
    } else {
      this.alert = 'lilah-no-pet'
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
      this.lilahPos += 2.5;
    } else if (this.lilahPos >= (maxTargetLilah+minTargetLilah)/2) {
      this.lilahPos -= 0.75
    } else if (this.lilahPos <= (maxTargetLilah+minTargetLilah)/2) {
      this.lilahPos += 1.5
    }
  }

  movePlayer(moveLeft) {
    this.playerPos = moveLeft ? this.playerPos - 3 : this.playerPos + 3
  }

  regularUpdate() {
    if (!this.gameOver && !this.debugMode) {
      this.updateLoveAndLilah();
      this.tryToDrinkWater();
      this.checkAndResetToMax();
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
        console.log('cur >= this.loveCurrent', threshold, cur, this.loveCurrent)
        return threshold.type === 'TARGET'
      }
    }
    return false
  }

  tryToDrinkWater() {
    if (this.lilahInTargetPosition() && this.loveInTargetPosition()) {
      this.thirstQuenched += 3.5;
      this.lilahAnimation = 'drink'+ Math.random();
      if (this.thirstQuenched > 99) {
        this.endGame(GAME_OVER_GAME_WON);
      }
    }
  }

  updateTimer() {
    this.timeRemaining -= 0.5;
    if (this.timeRemaining < 0) {
      this.endGame(GAME_OVER_OUT_OF_TIME);
    }
  }

  updateLoveAndLilah() {
    if (this.loveCurrent >= 90) {
      this.loveCurrent -= 0.25;
    } else if (this.loveCurrent >= 80) {
      this.loveCurrent -= 0.4;
    } else if (this.loveCurrent >= 60) {
      this.loveCurrent -= 0.5;
    } else {
      this.loveCurrent -= 1;
    }

    if (this.loveCurrent > 85) {
      if (this.lilahPos >= (maxTargetLilah+minTargetLilah)/2 ) {
        this.lilahPos -= 0.1
      }
      if (this.lilahPos <= (maxTargetLilah+minTargetLilah)/2) {
        this.lilahPos += 0.1
      }
    }
    if (this.loveCurrent < loveBar.thresholds[0].size) {
      if (this.lilahPos < 0) {
        this.lilahPos = 0;
      }
      this.endGame(GAME_OVER_LOVE_TOO_LOW);
      return
    }
  }

  checkAndResetToMax() {
    if (this.loveCurrent < loveBar.thresholds[0].size) {
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

  lilahInTargetPosition() {
    return this.lilahPos > minTargetLilah && this.lilahPos < maxTargetLilah;
  }

  isLilahSad() {
    return this.loveCurrent < 44;
  }

  endGame(status) {
    // this.lilahPos = 40;
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
      lilahAnimation: this.lilahAnimation
    }
  }

}

export {GameService};
