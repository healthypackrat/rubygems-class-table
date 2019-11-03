import React from 'react';
import { connect } from 'react-redux';
import TableHeaderRow from './TableHeaderRow';
import TableRow from './TableRow';
import ResultCount from './ResultCount';

const Table = ({ isFetching, filteredEntries }) => {
  if (isFetching) {
    return <p className="text-center">Loading...</p>;
  } else {
    return (
      <div>
        <ResultCount />
        <table className="table table-hover">
          <thead>
            <TableHeaderRow />
          </thead>
          <tbody>
            {filteredEntries.map(entry => <TableRow entry={entry} key={entry.class_name} />)}
          </tbody>
        </table>
      </div>
    );
  }
};

const mapStateToProps = state => {
  const slug = state.entries.currentSlug;
  const cache = slug && state.entries.bySlug[slug];
  const isFetching = cache ? cache.isFetching : true;

  return {
    isFetching: isFetching,
    filteredEntries: state.entries.filteredEntries
  };
};

export default connect(mapStateToProps)(Table);
