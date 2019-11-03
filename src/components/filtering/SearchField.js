import React from 'react';
import { connect } from 'react-redux';
import { setFilterKey } from '../../actions/entries';
const _ = require('lodash');

class SearchField extends React.Component {
  constructor(props) {
    super(props);

    this.state = { input: this.props.filterKey };
  }

  setFilterKey = _.debounce(() => {
    this.props.setFilterKey(this.state.input);
  }, 500);

  updateInput = event => {
    this.setState({ input: event.target.value });
    this.setFilterKey();
  };

  render() {
    return (
      <div className="form-group">
        <input type="search" className="form-control" placeholder="クラス名で検索..." value={this.state.input} onChange={this.updateInput} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { filterKey: state.entries.filterKey };
};

export default connect(
  mapStateToProps,
  { setFilterKey }
)(SearchField);
