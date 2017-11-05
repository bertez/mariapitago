import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Help.css';

class Help extends React.Component {
  constructor(props) {
    super(props);

    this.messages = [
      'Benvido! Son María Pita, a heroína da Coruña.',
      'Únete conmigo nesta aventura onde descubriremos os lugares secretos da Coruña.',
      'Teremos que ir a diferentes rúas, prazas, etc; e alí nos agardarán segredos que descubrirás co teu móvil.',
      'Cando chegues o lugar, só tes que darlle a o icono de "!" que verás en pantalla, e despois de descuberto mudará por una estrela.',
      'No menú que aparece ao pulsar no botón de abaixo a esquerda, poderás ver cantos lugares e cales che faltan por visitar.',
      'Ao descubrilos sumarás puntos e cando chegues a certas cantidades, aparecerá lugares segredos marcados con icono: "?"',
      'É fácil, non?',
      'Olliño! Non te metas en lugares proibidos nen tampouco molestes aos outros transeúntes!',
      'Bota a andar e pérdete por esta preciosa cidade.',
    ];

    this.state = {
      message: 0,
      buttonText: 'seguinte',
    };
  }

  nextMessage(e) {
    if (this.state.message === this.messages.length - 1) {
      this.props.logVisit();
      window.location = '/play';
    }

    e.preventDefault();

    if (this.state.message === this.messages.length - 2) {
      this.setState({
        buttonText: 'xogar',
      });
    }

    this.setState({
      message: this.state.message + 1,
    });
  }

  render() {
    return (
      <section className={styles.help}>
        <div>
          <img src="/media/maria.png" />
        </div>
        <div className={styles.helpContent}>
          <div>
            <span>{this.messages[this.state.message]}</span>
          </div>
        </div>
        <div className={styles.footer}>
          <Link
            to="/play"
            className={styles.button}
            onClick={this.nextMessage.bind(this)}
          >
            {this.state.buttonText}
          </Link>
        </div>
      </section>
    );
  }
}

export default Help;
