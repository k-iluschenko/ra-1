import React from 'react';

const withData = (endpoint, propName) => Component => class extends React.Component {
  static get displayName() {
    const name = Component.displayName || Component.name || 'Component';
    return `WithData(${name})`;
  }

  constructor(props) {
    super(props);
    this.state = {
      [propName]: undefined
    };
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps);
  }

  fetchData(props) {
    if (typeof endpoint === 'function') {
      endpoint = endpoint(props);
    }
    fetch(endpoint)
      // .then(res => {document.querySelector('.loading' ).classList.remove('hidden'); return res})
      .then(res => (res.status === 200 ? res : new Error(res)))
      .then((res) => { document.querySelector('.loading').classList.add('hidden'); return res; })
      .then(res => res.json())
      .then(res => (res.status === 'ok' ? res.data : new Error(res.status)))
      .then(data => (this.setState({ [propName]: data })))
      .catch((error) => { console.log('error', error); });
  }

  render() {
    return <Component {...this.props} {...this.state} />;
  }
};

export default withData;
