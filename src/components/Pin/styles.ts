import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  capturePinSection: {
    flexDirection: 'column',
    marginTop: 2,
    width: '80%',
    height: 225,
    justifyContent: 'space-between',
  },
  titleSection: {
    flexDirection: 'column',
    marginTop: 20,
    alignSelf: 'center',
  },
  pinSection: {
    flexDirection: 'column',
  },
  pinInputView: {
    flexDirection: 'row',
    marginTop: 15,
    borderColor: 'gray',
    color: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
    height: 50,
  },
  pinInput: {
    borderColor: 'gray',
    color: 'gray',
    fontSize: 18,
    height: 50,
  },
  showHideButton: {
    alignItems: 'flex-end',
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 5,
  },
  pinButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  nextButton: {
    borderRadius: 20,
  },
});

export default styles;
