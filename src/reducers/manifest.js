import { REQUEST_MANIFEST, RECEIVE_MANIFEST } from '../actions/manifest';

const initialState = {
  isFetching: false,
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_MANIFEST:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_MANIFEST:
      return {
        ...state,
        isFetching: false,
        items: action.payload.data.map(value => value.replace(/\.json$/, ''))
      };
    default:
      return state;
  }
};
