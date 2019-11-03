import React from 'react';
import { connect } from 'react-redux';
import { setHideNoDoc } from '../../actions/entries';

const HideNoDoc = ({ hideNoDoc, setHideNoDoc }) => {
  return (
    <div className="form-check form-group">
      <input type="checkbox" id="hideNoDoc" className="form-check-input" checked={hideNoDoc} onChange={e => setHideNoDoc(e.target.checked)} />
      <label className="form-check-label" htmlFor="hideNoDoc">ドキュメントが書かれていないクラスを隠す</label>
    </div>
  );
};

const mapStateToProps = state => {
  return { hideNoDoc: state.entries.hideNoDoc };
};

export default connect(
  mapStateToProps,
  { setHideNoDoc }
)(HideNoDoc);
