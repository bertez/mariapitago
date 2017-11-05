import React from 'react';
import cn from 'classnames';

import styles from './CommonStyles.css';

const Pop = ({ title, message, icon, action, actionText, view }) => (
  <div className={styles.pop}>
    <h1>{title}</h1>
    <div className={styles.popContent}>
      {icon ? <img src={`/media/thumbnails/${icon}.jpg`} /> : null}
      <p>{message}</p>
    </div>

    <div className={styles.buttons}>
      {view ? (
        <a className={cn(styles.viewButton)} target="_blank" href={view}>
          Ver este segredo
        </a>
      ) : null}
      {action ? (
        <button className={styles.popButton} onClick={action}>
          {actionText}
        </button>
      ) : null}
    </div>
  </div>
);

export default Pop;
