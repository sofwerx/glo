import React, { Component } from 'react';
import DeckGL, { LineLayer } from 'deck.gl';
import ReactMapGL from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default class Globe extends Component {
  state = {
    viewport: {
      height: 100,
      width: 100,
      longitude: -82.50621705971729,
      latitude: 28.010091178382265,
      zoom: 1,
      pitch: 0,
      bearing: 0,
    }
  }

  resize = () => {
    const viewport = { ...this.state.viewport, height: window.innerHeight - 56, width: window.innerWidth };
    this.setState({ viewport })
  }

  componentWillMount() {
    window.addEventListener('resize', this.resize)
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {

    // const locations = [
    //   {
    //     from: [-82.50621705971729, 28],
    //     to: [-122.271604, 37.803664]
    //   }
    // ];
    const locations = [
      [-82.50621705971729, 28.010091178382265],
      ...this.props.deployments.map(d => ([d.location.lon, d.location.lat]))
    ].reduce((acc, val, idx, all) => acc.concat([{ from: val, to: all[idx + 1] }]), []).slice(0, -1);
    console.log(locations);
    
    const deploymentLayer = new LineLayer(
      {
        id: 'layer1',
        data: locations,
        getSourcePosition: d => d.from,
        getTargetPosition: d => d.to,
        getColor: () => [39, 89, 183],
        getStrokeWidth: 10
      }
    )
    return (
      <div style={{ width: '100%', height: '80%' }}>
        <ReactMapGL
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          {...this.state.viewport}
          onViewportChange={(viewport) => {
            this.setState({ viewport })
            // Optionally call `setState` and use the state to update the map.
          }}
          onClick={({ lngLat }) => {
            if (this.props.onClick) {
              this.props.onClick(lngLat);
            }
          }}
        >

          <DeckGL className={'deck-gl'} {...this.state.viewport} layers={[deploymentLayer]}>
          </DeckGL>
        </ReactMapGL>
      </div>
    );

  }

}