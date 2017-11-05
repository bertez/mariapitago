import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.css';

const Home = ({score}) => (
  <section className={styles.home}>
    <div className={styles.score}>SCORE {score}</div>
    <div className={styles.title}>
      <img src="/media/logo.png" />
    </div>
    <div className={styles.front}>
      <img src="/media/front.png" />
    </div>

    <div className={styles.link}>
      <Link className={styles.button} to="/play">
        Comenzar
      </Link>
    </div>
    <p className={styles.credits}>
      Feito no hackaton de Coruña Dixital por Sara González, Daniel Pereyra e
      Berto Yáñez
    </p>
  </section>
);

export default Home;
