import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentSlug, fetchEntriesIfNeeded } from '../actions/entries';
import Table from './table/Table';

class EntryList extends React.Component {
  constructor(props) {
    super(props);

    this.slug = props.match.params.slug;
  }

  componentDidMount() {
    this.props.selectCurrentSlug(this.slug);
    this.props.fetchEntriesIfNeeded(this.slug);
  }

  render() {
    return (
      <div className="main container-fluid my-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active">{this.slug}</li>
        </ol>
        <Table />
      </div>
    );
  }
}

export default connect(
  null,
  { selectCurrentSlug, fetchEntriesIfNeeded }
)(EntryList);
