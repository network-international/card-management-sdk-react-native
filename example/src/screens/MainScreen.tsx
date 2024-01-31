import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import NIButton from '../components/NIButton';
import { InputContext } from './ContextView';
import ManagementCardDetail from '../components/ManagementCardDetail';
import { type RootStackParamList } from '../navigation/RootNavigator';

import { NIThemeEnum } from '@networkinternational/ni-card-management-sdk';

type MainProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

function MainScreen({ navigation }: MainProps): JSX.Element {
  const { inputData: input } = useContext(InputContext);

  const [pinType, setPinType] = useState('4');
  const colors: string[] | undefined = ['#2197ba', '#0512ae', '#041584'];
  const textColor =
    input.displayAttributes?.theme === NIThemeEnum.dark ? 'white' : 'black';

  return (
    <>
      <ManagementCardDetail pinType={{ pinType, setPinType }} />
      <View style={styles.button}>
        <NIButton
          title="Card details component"
          mode="text"
          textColor={textColor}
          colors={colors}
          onPress={() => navigation.navigate('CardDetailsComponent')}
        />
      </View>

      <View style={styles.button}>
        <NIButton
          title="Set pin"
          mode="text"
          textColor={textColor}
          colors={colors}
          onPress={() =>
            navigation.navigate('SetPin', { type: parseInt(pinType, 10) })
          }
        />
      </View>

      <View style={styles.button}>
        <NIButton
          title="Verify pin"
          mode="text"
          textColor={textColor}
          colors={colors}
          onPress={() =>
            navigation.navigate('VerifyPin', { type: parseInt(pinType, 10) })
          }
        />
      </View>

      <View style={styles.button}>
        <NIButton
          title="Change pin"
          mode="text"
          textColor={textColor}
          colors={colors}
          onPress={() =>
            navigation.navigate('ChangePin', { type: parseInt(pinType, 10) })
          }
        />
      </View>
      <View style={styles.button}>
        <NIButton
          title="View pin component"
          mode="text"
          textColor={textColor}
          colors={colors}
          onPress={() => {
            navigation.navigate('ViewPinComponent', {
              type: parseInt(pinType, 10),
            });
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
