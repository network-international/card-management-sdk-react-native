import { StyleSheet } from 'react-native';
import { HEIGHT_CARD, WIDTH_CARD } from '../../config/configCard';

export const styles = StyleSheet.create({
  cardDetailsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  cardDetailsRow: {
    width: `${WIDTH_CARD}%`,
    height: HEIGHT_CARD,
    alignItems: 'center',
    borderRadius: 20,
  },

  containerCardDetails: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },

  backgroundImageStyle: {
    resizeMode: 'cover',
    borderRadius: 20,
  },

  copyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 5,
  },

  textLabel: {
    color: 'white',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 12,
    textAlign: 'left',
    letterSpacing: 0,
    writingDirection: 'ltr',
  },

  textContent: {
    color: 'white',
    fontFamily: 'Helvetica',
    fontWeight: '400',
    fontSize: 18,
    textAlign: 'left',
    letterSpacing: 0,
    writingDirection: 'ltr',
  },

  containerGroupsLeftAlignment: {
    marginLeft: 40,
  },

  containerCardNumberGroupTopAlignment: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    top: 60,
  },
  containerCardNumberContentGroupTopAlignment: {
    position: 'absolute',
    top: 65,
  },

  containerDateCVVGroupTopAlignment: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    top: 85,
    gap: 50,
  },

  containerDateCVVContentGroupTopAlignment: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    top: 110,
    gap: 45,
  },

  containerHolderNameGroupTopAlignment: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    top: 135,
  },

  containerHolderNameContentGroupTopAlignment: {
    position: 'absolute',
    top: 160,
  },

  copyButton: {
    alignSelf: 'center',
    marginTop: '30%',
    width: '60%',
  },
});

export default styles;
