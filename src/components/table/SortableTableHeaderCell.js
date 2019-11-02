import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { setSortKey } from '../../actions/entries';

const SortableTableHeaderCell = ({ label, sortKey, isNumber, width, stateSortKey, sortOrders, setSortKey }) => {
  const className = classnames({
    'table-info': sortKey === stateSortKey,
    'text-right': isNumber,
    'pointer': true
  }, sortOrders[sortKey] > 0 ? 'dropup' : 'dropdown');
  const style = { width: width };
  return (
    <th className={className}
      style={style}
      onClick={() => setSortKey(sortKey)}
    >
      {label}
      {" "}
      <span className="dropdown-toggle"></span>
    </th>
  );
};

const mapStateToProps = state => {
  return {
    stateSortKey: state.entries.sortKey,
    sortOrders: state.entries.sortOrders
  };
};

export default connect(
  mapStateToProps,
  { setSortKey }
)(SortableTableHeaderCell);
