import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import { Link } from 'react-router-dom';

import styles from './Play.css';

import Pop from '../Common/Pop.jsx';

const zoom = 18;

const possibleIcon = new Image();
possibleIcon.src = '/media/possible.png';

const openIcon = new Image();
openIcon.src = '/media/open.png';

const foundIcon = new Image();
foundIcon.src = '/media/found.png';

function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000;
}

const Map = ReactMapboxGl({
  attributionControl: false,
  doubleClickZoom: false,
  touchZoomRotate: true,
  scrollZoom: false,
  dragPan: false,
  dragRotate: true,
  keyboard: true,
  minZoom: zoom,
  logoPosition: 'bottom-right',
  maxZooom: zoom,
  accessToken:
    'pk.eyJ1IjoiYmVydGV6IiwiYSI6ImNqOWw5MWF4YzFxaTUzMnA3d29sMG84amMifQ.QTdb7EzU5jkpgFA7cU8fqw',
});

class Play extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      center: [],
      possiblePopup: false,
      foundPopup: false,
      bearing: null,
      openPoints: [],
      possiblePoints: [],
    };
  }

  componentDidMount() {
    this.watcher = navigator.geolocation.watchPosition(
      this.updateLocation.bind(this),
      function(error) {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watcher);
  }

  updateLocation(position) {
    const coords = position.coords;

    const pointsDistance = this.props.data.map(p => {
      return {
        ...p,
        distance: getDistanceFromLatLon(
          coords.latitude,
          coords.longitude,
          p.latitude,
          p.longitude
        ),
      };
    });

    const possiblePoints = pointsDistance.filter(
      p => p.distance < 1000 && p.distance > 100 && !p.found
    );

    const openPoints = pointsDistance.filter(p => p.distance < 100 && !p.found);

    const foundPoints = pointsDistance.filter(
      p => p.distance < 1000 && p.found
    );

    this.setState({
      center: [coords.longitude, coords.latitude],
      bearing: coords.heading,
      openPoints,
      possiblePoints,
      foundPoints,
    });
  }

  getPossible() {
    if (this.state.possiblePoints.length === 0) return null;

    const possible = this.state.possiblePoints.map((p, i) => {
      const c = [p.longitude, p.latitude];
      return (
        <Feature
          onClick={() =>
            this.setState({
              possiblePopup: true,
            })}
          key={`fp_${p.id}`}
          coordinates={c}
        />
      );
    });

    return (
      <Layer
        layout={{ 'icon-image': 'possible' }}
        images={['possible', possibleIcon]}
      >
        {possible}
      </Layer>
    );
  }

  getOpen() {
    if (this.state.openPoints.length === 0) return null;

    const open = this.state.openPoints.map((p, i) => {
      return (
        <Feature
          onClick={() => {
            this.setState({
              foundPopup: p,
            });
          }}
          key={`fo_${p.id}`}
          coordinates={[p.longitude, p.latitude]}
        />
      );
    });

    return (
      <Layer layout={{ 'icon-image': 'open' }} images={['open', openIcon]}>
        {open}
      </Layer>
    );
  }

  getFound() {
    if (this.state.foundPoints.length === 0) return null;

    const found = this.state.foundPoints.map((p, i) => {
      return (
        <Feature key={`ff_${p.id}`} coordinates={[p.longitude, p.latitude]} />
      );
    });

    return (
      <Layer layout={{ 'icon-image': 'found' }} images={['found', foundIcon]}>
        {found}
      </Layer>
    );
  }

  render() {
    return (
      <section className="{styles.play}">
        {this.state.center.length ? (
          <Map
            style="mapbox://styles/mapbox/dark-v9"
            zoom={[zoom]}
            pitch={60}
            bearing={this.state.bearing}
            center={this.state.center}
            containerStyle={{
              height: '100vh',
              width: '100vw',
            }}
          >
            {/* Layers */}
            {this.getPossible()}
            {this.getOpen()}
            {this.getFound()}

            {/* Player */}
            <Marker coordinates={this.state.center} anchor="bottom">
              <img src="/media/player.png" />
            </Marker>
          </Map>
        ) : (
          <div className={styles.loading}>
            <div>...</div>
          </div>
        )}

        {/* Popups */}
        {this.state.possiblePopup ? (
          <Pop
            title="Estás moi lonxe!"
            message="Achégate máis para desbloquear ese punto"
            actionText="Pechar"
            action={() =>
              this.setState({
                possiblePopup: false,
              })}
          />
        ) : null}

        {this.state.foundPopup ? (
          <Pop
            title={`${this.state.foundPopup.title}`}
            view={this.state.foundPopup.link}
            icon={this.state.foundPopup.id}
            message={`${this.state.foundPopup.description} (${this.state
              .foundPopup.source})`}
            actionText="Marcar como visto"
            action={() => {
              this.props.logDiscover(this.state.foundPopup.id);
              this.setState({
                foundPopup: null,
              });
            }}
          />
        ) : null}

        <div className={styles.notch}>
          <span>SCORE {this.props.score}</span>
        </div>

        <Link to="/profile" className={styles.profile}>
          <img src="/media/profile.png" />
        </Link>
        <Link to="/" className={styles.home}>
          <img src="/media/home.svg" />
        </Link>
      </section>
    );
  }
}

export default Play;
