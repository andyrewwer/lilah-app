import {loveBar} from '../components/drink-water-game/bathroom/lilah-stats/LilahStats'

export const maxTargetLilah = 33;
export const minTargetLilah = 19;
export const minLilahPetRange = 58;
export const GAME_OVER_OUT_OF_TIME = 'GAME_OVER_OUT_OF_TIME';
export const GAME_OVER_LOVE_TOO_LOW = 'GAME_OVER_LOVE_TOO_LOW';
export const GAME_OVER_GAME_WON = 'GAME_OVER_GAME_WON';

class GameService {

// TODO Create a Lilah class that contains all these attributes
  constructor(loveCurrent, thirstQuenched, lilahPos, playerPos) {
    this.loveCurrent = loveCurrent;
    this.thirstQuenched = thirstQuenched;
    this.lilahPos = lilahPos;
    this.playerPos = playerPos;
    this.gameOver = false;
    this.gameStatus = null;
    this.timeRemaining = 120;
    this.highScore = 120;
    this.debugMode = false;
    this.alert = 'none';
    // this.debugMode = true;
  }

  petLilah() {
    if (Math.abs(this.playerPos - this.lilahPos) < 15) {
      this.loveCurrent += 3;
    } else {
      this.alert = 'Lilah is too far away :('
      console.log('she\'s too far away!')
    }
    // TODO Maybe only able to do this when she's within X number of squares of you?
  }

  ignoreLilah() {
    this.loveCurrent -= 0.75;
    this.lilahPos -= 1.25;
  }

  talkToLilah() {
    this.loveCurrent += 0.25;
    if (this.loveCurrent < loveBar.targetThreshold) {
      this.lilahPos += 2.5;
    } else if (this.lilahPos >= (maxTargetLilah+minTargetLilah)/2) {
      this.lilahPos -= 2.5
    } else if (this.lilahPos <= (maxTargetLilah+minTargetLilah)/2) {
      this.lilahPos += 2.5
    }

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

  tryToDrinkWater() {
    if (this.lilahInTargetPosition() && this.loveCurrent >= loveBar.targetThreshold) {
      this.thirstQuenched += 3.5;
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
    this.loveCurrent -= .35;

    if (this.loveCurrent > loveBar.targetThreshold) {
      if (this.lilahPos >= (maxTargetLilah+minTargetLilah)/2 ) {
        this.lilahPos -= 0.9
      }
      if (this.lilahPos <= (maxTargetLilah+minTargetLilah)/2) {
        this.lilahPos += 0.9
      }
    }
    if (this.loveCurrent < loveBar.loseThreshold) {
      if (this.lilahPos < 0) {
        this.lilahPos = 0;
      }
      this.endGame(GAME_OVER_LOVE_TOO_LOW);
      return
    }
  }

  checkAndResetToMax() {
    if (this.loveCurrent < loveBar.loseThreshold) {
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
    }
  }

}

export {GameService};
