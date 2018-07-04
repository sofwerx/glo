import React, { Component } from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';


import Root from './containers/Root';



class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <React.Fragment>
          <CssBaseline />
          <div>
            <Root />
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
