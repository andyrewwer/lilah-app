import {loveBar, attentionBar, thirstBar} from '../components/drink-water-game/bathroom/lilah-stats/LilahStats'

export const maxTargetLilah = 39;
export const minTargetLilah = 16;
export const minLilahPetRange = 58;

class GameService {

// TODO Create a Lilah class that contains all these attributes
  constructor(loveCurrent, attentionSeeked, thirstQuenched, lilahPos) {
    this.loveCurrent = loveCurrent;
    this.attentionSeeked = attentionSeeked;
    this.thirstQuenched = thirstQuenched;
    this.lilahPos = lilahPos;
    this.gameOver = false;
    this.gameWon = false;
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
    if (!this.gameOver) {
      this.updateAttentionLoveAndLilah();
      this.tryToDrinkWater();
      this.checkAndResetToMax();
    }
    return this.getState();
  }

  tryToDrinkWater() {
    if (this.lilahInTargetPosition() && this.loveCurrent >= loveBar.targetThreshold && this.attentionSeeked >= attentionBar.loseThreshold && this.attentionSeeked <= attentionBar.targetThreshold) {
      // this.thirstQuenched += 100;
      this.thirstQuenched += 3.5;
      if (this.thirstQuenched > thirstBar.targetThreshold) {
        this.endGame(true);
      }
    }
  }

  updateAttentionLoveAndLilah() {
    this.attentionSeeked -= .35;
    this.loveCurrent -= .35;

    if (this.loveCurrent < loveBar.loseThreshold) {
      this.endGame(false);
      return
    }
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
  }

  checkAndResetToMax() {
    if (this.loveCurrent < loveBar.loseThreshold) {
      this.endGame(false);
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
    if (this.lilahPos > 100) {
      this.lilahPos = 100;
    }
    if (this.lilahPos < 0) {
      this.lilahPos = 0;
    }
  }

  lilahInTargetPosition() {
    return this.lilahPos > minTargetLilah && this.lilahPos < maxTargetLilah;
  }

  endGame(won) {
    this.gameOver = true;
    this.gameWon = won;
  }

  startNewGame(loveCurrent, attentionSeeked, thirstQuenched, lilahPos) {
    this.loveCurrent = loveCurrent;
    this.attentionSeeked = attentionSeeked;
    this.thirstQuenched = thirstQuenched;
    this.lilahPos = lilahPos;
    this.gameOver = false;
    this.gameWon = false;
  }

  getState() {
    return {
      loveCurrent: this.loveCurrent,
      attentionSeeked: this.attentionSeeked,
      thirstQuenched: this.thirstQuenched,
      lilahPos: this.lilahPos,
      gameWon: this.gameWon,
      gameOver: this.gameOver
    }
  }

}

export {GameService};
