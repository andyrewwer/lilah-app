import {loveBar, attentionBar, thirstBar} from '../components/panel/lila-meta/LilaMeta'

class GameService {

  constructor(loveCurrent, attentionSeeked, thirstQuenched, lilaPos) {
    this.loveCurrent = loveCurrent;
    this.attentionSeeked = attentionSeeked;
    this.thirstQuenched = thirstQuenched;
    this.lilaPos = lilaPos;
  }

  petLila() {
    // Maybe only able to do this when she's within X number of squares of you?
    this.loveCurrent += 4.5;
    this.attentionSeeked += 1;
    if (this.loveCurrent > (loveBar.max * .9)) {
      this.attentionSeeked += 1;
    }
    if (this.attentionSeeked > attentionBar.targetThreshold) {
      this.lilaPos += 1;
    }
  }


  ignoreLila() {
    this.attentionSeeked -= 3.5;
    this.loveCurrent -= 0.5;
    this.lilaPos -= 4;
  }

  talkToLila() {
    this.attentionSeeked += 3.5;
    this.loveCurrent += 0.5;
    this.lilaPos += 3.5;
  }

  regularUpdate() {
    this.attentionSeeked -= .2;
    this.loveCurrent -= .15;

    if (this.loveCurrent < loveBar.loseThreshold) {
      // you lose
    }
    if (this.loveCurrent > loveBar.targetThreshold && this.attentionSeeked > attentionBar.max/2) {
      this.attentionSeeked -= 0.1
    }
    if (this.loveCurrent > loveBar.targetThreshold && this.attentionSeeked < attentionBar.max/2) {
      this.attentionSeeked += .4
    }
    if (this.attentionSeeked < attentionBar.loseThreshold) {
      this.lilaPos -= 1.8
    }
    if (this.attentionSeeked > attentionBar.targetThreshold) {
      this.lilaPos += 1.8
    }

    this.checkAndResetToMax();
    return this.getState();
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
