import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home/Home.jsx';
import Play from './Play/Play.jsx';
import Help from './Help/Help.jsx';
import Profile from './Profile/Profile.jsx';

import St from './state';

import styles from './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = St.getState();
  }

  logVisit() {
    const newState = St.updateState({
      ...this.state,
      firstTime: false,
    });

    this.setState(newState);
  }

  logDiscover(id) {
    const data = this.state.data.slice();
    data.find(d => d.id === id).found = true;

    const newState = St.updateState({
      ...this.state,
      data,
    });

    this.setState(newState);
  }

  reset() {
    St.reset();
    this.setState(St.getState());
  }



  render() {
    const found = this.state.data.filter(d => d.found === true).length;

    const score = found > 0 ? found * 122 : 0;

    return (
      <div>
        <Router>
          <section className={styles.app}>
            <Route
              exact
              path="/"
              component={props => {
                return (
                  <Home
                    score={score}
                    firstTime={this.state.firstTime}
                  />
                );
              }}
            />

            <Route
              exact
              path="/play"
              component={
                this.state.firstTime
                  ? props => {
                      return (
                        <Help
                          logVisit={this.logVisit.bind(this)}
                          score={score}
                          {...props}
                        />
                      );
                    }
                  : props => {
                      return (
                        <Play
                          logDiscover={this.logDiscover.bind(this)}
                          score={score}
                          data={this.state.data}
                          {...props}
                        />
                      );
                    }
              }
            />

            <Route
              exact
              path="/help"
              component={props => {
                return (
                  <Help
                    logVisit={this.logVisit.bind(this)}
                    score={score}
                    {...props}
                  />
                );
              }}
            />

            <Route
              exact
              path="/profile"
              component={props => {
                return (
                  <Profile
                    data={this.state.data}
                    reset={this.reset.bind(this)}
                    score={score}
                  />
                );
              }}
            />
          </section>
        </Router>
        <audio src="/media/music.mp3" autoPlay />
      </div>
    );
  }
}

export default App;
