import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Help.css';

class Help extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={styles.help}>
        <div>
          <img src="/media/maria.png" />
        </div>
        <div className={styles.helpContent}>
          <div>texto axuda</div>
        </div>
        <div>
          <Link
            to="/play"
            onClick={e => {
              e.preventDefault();
              this.props.logVisit();
              window.location.reload();
            }}
          >
            >
          </Link>
        </div>
      </section>
    );
  }
}

export default Help;
