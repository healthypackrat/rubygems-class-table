import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchManifestIfNeeded } from '../actions/manifest';

class Index extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchManifestIfNeeded());
  }

  render() {
    let content;

    if (this.props.isFetching) {
      content = <p className="text-center">Loading...</p>;
    } else {
      content = (
        <ul>
          {this.props.items.map(item => {
            return <li key={item}><Link to={`/gems/${item}`}>{item}</Link></li>;
          })}
        </ul>
      );
    }

    return (
      <div className="main container-fluid my-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">Home</li>
        </ol>
        <p><a href="https://github.com/healthypackrat/rubygems-class-table">リポジトリに戻る</a></p>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.manifest.isFetching,
    items: state.manifest.items
  };
};

export default connect(mapStateToProps)(Index);
