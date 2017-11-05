import data from '../../data/data.json';

const defaultState = {
  firstTime: true,
  data,
};

class St {
  constructor() {
    const savedState = localStorage.getItem('mariapitago');

    if (savedState) {
      this.state = JSON.parse(savedState);
    } else {
      this.reset();
    }
  }

  sync() {
    localStorage.setItem('mariapitago', JSON.stringify(this.state));
  }

  updateState(newState) {
    this.state = newState;
    this.sync();
    return this.state;
  }

  getState() {
    return this.state;
  }

  reset() {
    this.state = Object.assign({}, defaultState);
    this.sync();
  }
}

export default new St();