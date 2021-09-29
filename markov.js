/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let mChains = new Map();

    for (let i=0; i<this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i+1] || null;

      if (mChains.has(word)) mChains.get(word).push(nextWord);
      else mChains.set(word, [nextWord]);
    }
    this.mChains = mChains;
  }

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.mChains.keys())
    let key = MarkovMachine.choice(keys)
    let output = [];

    while (output.length < numWords && key !== null) {
      output.push(key);
      key = MarkovMachine.choice(this.mChains.get(key));
    }

    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
