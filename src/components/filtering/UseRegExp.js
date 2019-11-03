import React from 'react';
import { connect } from 'react-redux';
import { setUseRegExp } from '../../actions/entries';

const UseRegExp = ({ useRegExp, setUseRegExp }) => {
  return (
    <div className="form-check form-group">
      <input type="checkbox" id="useRegExp" className="form-check-input" checked={useRegExp} onChange={e => setUseRegExp(e.target.checked)} />
      <label className="form-check-label" htmlFor="useRegExp">正規表現で検索</label>
    </div>
  );
};

const mapStateToProps = state => {
  return { useRegExp: state.entries.useRegExp };
};

export default connect(
  mapStateToProps,
  { setUseRegExp }
)(UseRegExp);
