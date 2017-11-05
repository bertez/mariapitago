import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  listSecrets() {
    const secrets = this.props.data.map(d => {
      return (
        <div
          key={d.id}
          className={cn(styles.secret, {
            [styles.found]: d.found,
          })}
        >
          {d.found ? (
            <a href={d.link} target="_blank">
              <img src={`/media/thumbnails/${d.id}.jpg`} />
              <img className={styles.cover} src={`/media/cartatop.png`} />
            </a>
          ) : (
            <img src="/media/carta.png" />
          )}
          {d.found ? <p>{d.title}</p> : <p>???</p>}
        </div>
      );
    });

    return <div className={styles.grid}>{secrets}</div>;
  }

  render() {
    return (
      <section className={styles.profile}>
        <header>
          <div className={styles.headerTop}>
            <Link to="/play">
              <img src="/media/map.svg" /> patrullar
            </Link>
            <div>
              <a
                target="_blank"
                href="https://twitter.com/intent/tweet?url={url}&text={title}&via={via}&hashtags={hashtags}"
              >
                <img src="/media/twitter.svg" />
              </a>{' '}
              <a
                target="_blank"
                href="https://www.facebook.com/sharer.php?u={url}"
              >
                <img src="/media/facebook.svg" />
              </a>
            </div>
          </div>

          <div>
            <img src="/media/maria.png" />
          </div>

          <p className={styles.description}>
            Heroína da defensa de Coruña contra a Armada Británica en 1589.
          </p>

          <p className={styles.score}>SCORE {this.props.score}</p>
        </header>

        <div className={styles.grid}>{this.listSecrets()}</div>
        <div><button onClick={this.props.reset} className={styles.forget}>Reset</button></div>
      </section>
    );
  }
}

export default Profile;
