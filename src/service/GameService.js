import {loveBar, attentionBar} from '../components/drink-water-game/bathroom/lilah-stats/LilahStats'

export const maxTargetLilah = 33;
export const minTargetLilah = 19;
export const minLilahPetRange = 58;
export const GAME_OVER_OUT_OF_TIME = 'GAME_OVER_OUT_OF_TIME';
export const GAME_OVER_LOVE_TOO_LOW = 'GAME_OVER_LOVE_TOO_LOW';
export const GAME_OVER_GAME_WON = 'GAME_OVER_GAME_WON';

class GameService {

// TODO Create a Lilah class that contains all these attributes
  constructor(loveCurrent, attentionSeeked, thirstQuenched, lilahPos, playerPos) {
    this.loveCurrent = loveCurrent;
    this.attentionSeeked = attentionSeeked;
    this.thirstQuenched = thirstQuenched;
    this.lilahPos = lilahPos;
    this.playerPos = playerPos;
    this.gameOver = false;
    this.gameStatus = null;
    this.timeRemaining = 120;
    this.highScore = 120;
    this.debugMode = false;
    this.debugMode = true;
  }

  petLilah() {
    // TODO Maybe only able to do this when she's within X number of squares of you?
    this.loveCurrent += 3;
    this.attentionSeeked += 0.8;
    if (this.loveCurrent > (loveBar.max * .9)) {
      this.attentionSeeked += 1;
    }
    if (this.attentionSeeked > attentionBar.targetThreshold) {
      this.lilahPos += 1;
    }
  }

  ignoreLilah() {
    this.attentionSeeked -= 2;
    this.loveCurrent -= 2;
    this.lilahPos -= 1.5;
  }

  talkToLilah() {
    this.attentionSeeked += 1.5;
    this.loveCurrent += 1.5;
    this.lilahPos += 2.5;
  }

  regularUpdate() {
    if (!this.gameOver && !this.debugMode) {
      this.updateAttentionLoveAndLilah();
      this.tryToDrinkWater();
      this.checkAndResetToMax();
      this.updateTimer();
    }
    return this.getState();
  }

  tryToDrinkWater() {
    if (this.lilahInTargetPosition() && this.loveCurrent >= loveBar.targetThreshold && this.attentionSeeked >= attentionBar.loseThreshold && this.attentionSeeked <= attentionBar.targetThreshold) {
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

  updateAttentionLoveAndLilah() {
    this.attentionSeeked -= .35;
    this.loveCurrent -= .35;

    if (this.loveCurrent > loveBar.targetThreshold) {
      if (this.attentionSeeked > (attentionBar.loseThreshold + attentionBar.targetThreshold)/2) {
        this.attentionSeeked -= 0.1
      }
      if (this.attentionSeeked < (attentionBar.loseThreshold + attentionBar.targetThreshold)/2) {
        this.attentionSeeked += .45
      }
      if (this.attentionSeeked > attentionBar.loseThreshold && this.attentionSeeked < attentionBar.targetThreshold) {
        if (this.lilahPos >= (maxTargetLilah+minTargetLilah)/2 ) {
          this.lilahPos -= 0.9
        }
        if (this.lilahPos <= (maxTargetLilah+minTargetLilah)/2) {
          this.lilahPos += 0.9
        }
      }
    }
    if (this.attentionSeeked < attentionBar.loseThreshold) {
      this.lilahPos -= 1.8
    }
    if (this.attentionSeeked > attentionBar.targetThreshold) {
      this.lilahPos += 1.8
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
    if (this.attentionSeeked > attentionBar.max) {
      this.attentionSeeked = attentionBar.max
    }
    if (this.attentionSeeked < 0) {
      this.attentionSeeked = 0;
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

  startNewGame(loveCurrent, attentionSeeked, thirstQuenched, lilahPos, playerPos) {
    this.loveCurrent = loveCurrent;
    this.attentionSeeked = attentionSeeked;
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
      attentionSeeked: this.attentionSeeked,
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
