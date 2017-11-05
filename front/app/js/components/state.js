import data from '../../data/data.json';

const defaultState = {
  firstTime: true,
  data
};

class St {
  constructor() {
    const savedState = localStorage.getItem('apatrullando');

    if(savedState) {
      this.state = JSON.parse(savedState);
    } else {
      this.state = defaultState;
      this.sync();
    }
  }

  sync() {
    localStorage.setItem('apatrullando', JSON.stringify(this.state));
  }

  updateState(newState) {
    this.state = newState;
    this.sync();
    return this.state;
  }

  getState() {
    return this.state;
  }
}

export default new St();