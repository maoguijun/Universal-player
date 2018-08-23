// @flow
import * as api from '../utils/fetch/fetch';

export const getAllVideoSource = () => dispatch => {
  api.source
    .getAllVideoSource()
    .then(res => dispatch({ type: 'GETALLVIDEOSOURCE', payload: res.data }));
};
