import React from 'react';
import DeckGL, { LineLayer } from 'deck.gl';
import ReactMapGL from 'react-map-gl';

import './Globe.css';

const data = [{ sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781] }];

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default class Globe extends React.PureComponent {
  state = {
    viewport: {
      height: 100,
      width: 100,
      longitude: -82.50621705971729, 
      latitude: 28.010091178382265,
      zoom: 6,
      pitch: 0,
      bearing: 0,
    }
  }

  resize = () => {
    const viewport = {...this.state.viewport, height: window.innerHeight, width: window.innerWidth};
    this.setState({viewport})
    console.log('updating...')
  }

  componentWillMount() {
    window.addEventListener('resize', this.resize)
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    return (
      <div style={{ width: '100%', height:'80%' }}>
        <ReactMapGL
          
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          {...this.state.viewport}
          onViewportChange={(viewport) => {
            this.setState({viewport})
            // Optionally call `setState` and use the state to update the map.
          }}
          onClick={({lngLat}) => {
            if(this.props.onClick){
              this.props.onClick(lngLat);
            }
          }}
        >

          <DeckGL className={'deck-gl'} {...this.state.viewport} >
            <LineLayer id='layer1' data={data} getColor={() => [255, 0 , 0]} getStrokeWidth={12} />
          </DeckGL>
        </ReactMapGL>
      </div>
    );

  }

}