import React from 'react';
import { connect } from 'react-redux';
import { setInvertResult } from '../../actions/entries';

const InvertResult = ({ invertResult, setInvertResult }) => {
  return (
    <div className="form-check form-group">
      <input type="checkbox" id="invertResult" className="form-check-input" checked={invertResult} onChange={e => setInvertResult(e.target.checked)} />
      <label className="form-check-label" htmlFor="invertResult">一致しないものを表示</label>
    </div>
  );
};

const mapStateToProps = state => {
  return { invertResult: state.entries.invertResult };
};

export default connect(
  mapStateToProps,
  { setInvertResult }
)(InvertResult);
