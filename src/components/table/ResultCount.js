import React from 'react';
import { connect } from 'react-redux';

const ResultCount = ({ entry_count, char_count, percentage }) => {
  return (
    <p>{entry_count}件の結果、{char_count}文字 ({percentage}%)</p>
  );
};

const mapStateToProps = state => {
  return {
    entry_count: state.entries.filteredEntries.length,
    char_count: state.entries.filteredEntries.reduce((sum, entry) => sum + entry.total, 0).toLocaleString(),
    percentage: state.entries.percentage
  };
};

export default connect(mapStateToProps)(ResultCount);
