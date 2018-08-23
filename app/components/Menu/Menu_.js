// @flow
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  menu: {
    height: [{ unit: 'px', value: 40 }],
    background: '#fff',
    textAlign: 'right',
    padding: [
      { unit: 'px', value: 8 },
      { unit: 'px', value: 16 },
      { unit: 'px', value: 8 },
      { unit: 'px', value: 16 }
    ]
  },
  button: {
    border: [{ unit: 'px', value: 0 }, { unit: 'string', value: '!important' }]
  }
});
