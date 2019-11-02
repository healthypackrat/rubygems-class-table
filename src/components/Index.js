import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchManifestIfNeeded } from '../actions/manifest';

class Index extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchManifestIfNeeded());
  }

  render() {
    return (
      <div className="container my-3">
        <ul>
          {this.props.items.map(item => {
            return <li key={item}><Link to={`/gems/${item}`}>{item}</Link></li>;
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { items: state.manifest.items };
};

export default connect(mapStateToProps)(Index);
