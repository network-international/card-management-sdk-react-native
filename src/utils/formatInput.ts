import { Platform } from 'react-native';

import type { NiInputInterface } from '../interfaces/NiInputInterfaces';

const formatInput = (input: NiInputInterface) =>
  Platform.OS === 'ios' ? input : JSON.stringify(input);

export default formatInput;
