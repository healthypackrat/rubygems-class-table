import React from 'react';
import { connect } from 'react-redux';
import TableHeaderRow from './TableHeaderRow';
import TableRow from './TableRow';

const Table = ({ filteredEntries }) => {
  return (
    <table className="table table-hover">
      <thead>
        <TableHeaderRow />
      </thead>
      <tbody>
        {filteredEntries.map(entry => <TableRow entry={entry} key={entry.class_name} />)}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return { filteredEntries: state.entries.filteredEntries };
};

export default connect(mapStateToProps)(Table);
