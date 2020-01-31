import React, { Component, Fragment } from 'react';

import { API } from 'aws-amplify'

import backend from './config/backend'

import League from './component/League';

import './App.css';
import './pop.css';

class App extends Component {
  state = {
    items: [],
  }

  componentDidMount() {
    this.getLeagues();
  }

  getLeagues = async () => {
    const res = await API.get(backend.api.leagues, '/leagues');
    if (res && res.length > 0) {
      this.reloaded(res);
    }
  }

  reloaded(res) {
    let items = res.reverse(this.compare);

    this.setState({ items: items });
  }

  compare(a, b) {
    let a1 = a.regsterd;
    let b1 = b.regsterd;
    if (a1 < b1) {
      return -1;
    } else if (a1 > b1) {
      return 1;
    }
    return 0;
  }

  render() {
    const list = this.state.items.map(
      (item, index) => (<League key={index} item={item} />)
    );

    return (
      <Fragment>
        <header className="App-header">
          <div className="logo">
            <img alt="deepracer" src="https://deepracer-logos.s3.ap-northeast-2.amazonaws.com/logo_deepracer.png" />
          </div>
        </header>
        <div className="lb-items">
          <div className="lb-header">
            <div>Logo</div>
            <div>Title</div>
            <div>League</div>
          </div>
          {list}
        </div>
      </Fragment>
    );
  }
}

export default App;
