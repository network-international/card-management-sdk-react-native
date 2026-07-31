import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import NIButton from '../components/NIButton';
import ManagementCardDetail from '../components/ManagementCardDetail';
import { type RootStackParamList } from '../navigation/RootNavigator';
import { useSampleConfig } from '../config/useSampleConfig';
import { getSampleThemeColors } from '../config/sampleTheme';

type MainProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

function MainScreen({ navigation }: MainProps): JSX.Element {
  const config = useSampleConfig();
  const colors = getSampleThemeColors(config.input?.displayAttributes?.theme);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ManagementCardDetail config={config} colors={colors} />
      <View style={styles.button}>
        <NIButton
          title="Card details component"
          mode="text"
          textColor={colors.buttonText}
          colors={colors.buttonGradient}
          onPress={() => navigation.navigate('CardDetailsComponent')}
        />
      </View>

      <View style={styles.button}>
        <NIButton
          title="Set pin"
          mode="text"
          textColor={colors.buttonText}
          colors={colors.buttonGradient}
          onPress={() =>
            navigation.navigate('SetPin', {
              type: parseInt(config.pinType, 10),
            })
          }
        />
      </View>

      <View style={styles.button}>
        <NIButton
          title="Verify pin"
          mode="text"
          textColor={colors.buttonText}
          colors={colors.buttonGradient}
          onPress={() =>
            navigation.navigate('VerifyPin', {
              type: parseInt(config.pinType, 10),
            })
          }
        />
      </View>

      <View style={styles.button}>
        <NIButton
          title="Change pin"
          mode="text"
          textColor={colors.buttonText}
          colors={colors.buttonGradient}
          onPress={() =>
            navigation.navigate('ChangePin', {
              type: parseInt(config.pinType, 10),
            })
          }
        />
      </View>
      <View style={styles.button}>
        <NIButton
          title="View pin component"
          mode="text"
          textColor={colors.buttonText}
          colors={colors.buttonGradient}
          onPress={() => {
            navigation.navigate('ViewPinComponent', {
              type: parseInt(config.pinType, 10),
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  button: {
    margin: 4,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

export default MainScreen;
