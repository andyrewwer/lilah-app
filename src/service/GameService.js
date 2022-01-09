import {loveBar, attentionBar, thirstBar} from '../components/bathroom/lila-meta/LilaMeta'

export const maxTargetLila = 44;
export const minTargetLila = 26;

class GameService {


  constructor(loveCurrent, attentionSeeked, thirstQuenched, lilaPos) {
    this.loveCurrent = loveCurrent;
    this.attentionSeeked = attentionSeeked;
    this.thirstQuenched = thirstQuenched;
    this.lilaPos = lilaPos;
  }

  petLila() {
    // Maybe only able to do this when she's within X number of squares of you?
    this.loveCurrent += 3;
    this.attentionSeeked += 0.8;
    if (this.loveCurrent > (loveBar.max * .9)) {
      this.attentionSeeked += 1;
    }
    if (this.attentionSeeked > attentionBar.targetThreshold) {
      this.lilaPos += 1;
    }
  }

  ignoreLila() {
    this.attentionSeeked -= 2;
    this.loveCurrent -= 2;
    this.lilaPos -= 1;
  }

  talkToLila() {
    this.attentionSeeked += 1.5;
    this.loveCurrent += 1.5;
    this.lilaPos += 2.5;
  }

  regularUpdate() {

    this.updateAttentionLoveAndLila();
    this.tryToDrinkWater();
    this.checkAndResetToMax();

    return this.getState();
  }

  tryToDrinkWater() {
    if (this.lilaInTargetPosition() && this.loveCurrent >= loveBar.targetThreshold && this.attentionSeeked >= attentionBar.loseThreshold && this.attentionSeeked <= attentionBar.targetThreshold) {
      this.thirstQuenched += 4;
      if (this.thirstQuenched > thirstBar.targetThreshold) {
        // you win
      }
    }
  }

  updateAttentionLoveAndLila() {
    this.attentionSeeked -= .35;
    this.loveCurrent -= .35;

    if (this.loveCurrent < loveBar.loseThreshold) {
      // you lose
    }
    if (this.loveCurrent > loveBar.targetThreshold) {
      if (this.attentionSeeked > (attentionBar.loseThreshold + attentionBar.targetThreshold)/2) {
        this.attentionSeeked -= 0.1
      }
      if (this.attentionSeeked < (attentionBar.loseThreshold + attentionBar.targetThreshold)/2) {
        this.attentionSeeked += .45
      }
      if (this.attentionSeeked > attentionBar.loseThreshold && this.attentionSeeked < attentionBar.targetThreshold) {
        if (this.lilaPos >= (maxTargetLila+minTargetLila)/2 ) {
          this.lilaPos -= 0.9
        }
        if (this.lilaPos <= (maxTargetLila+minTargetLila)/2) {
          this.lilaPos += 0.9
        }
      }
    }
    if (this.attentionSeeked < attentionBar.loseThreshold) {
      this.lilaPos -= 1.8
    }
    if (this.attentionSeeked > attentionBar.targetThreshold) {
      this.lilaPos += 1.8
    }
  }

  checkAndResetToMax() {
    if (this.thirstQuenched > thirstBar.targetThreshold) {
      // YOU WIN
    }
    if (this.loveCurrent < loveBar.loseThreshold) {
      // YOU LOSE
      this.loveCurrent = loveBar.loseThreshold;
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
    if (this.lilaPos > 100) {
      this.lilaPos = 100;
    }
    if (this.lilaPos < 0) {
      this.lilaPos = 0;
    }
  }

  lilaInTargetPosition() {
    return this.lilaPos > minTargetLila && this.lilaPos < maxTargetLila;
  }

  getState() {
    return {
      loveCurrent: this.loveCurrent,
      attentionSeeked: this.attentionSeeked,
      thirstQuenched: this.thirstQuenched,
      lilaPos: this.lilaPos,
    }
  }

}

export {GameService};
