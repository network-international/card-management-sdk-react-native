# Network International React Native Card Management SDK

The Network International React Native Card Management SDK allows you to integrate with Network International standard APIs for card management. (https://developer.network.ae)
A NICardManagement wrapper is used to integrate the Network International SDK into react-native projects, whose methods access the native NiCardManagement SDK. 

The current supported features are:
1. Get Secured Card Details : Display a card component providing the ability to show card number, expiry date, CVV and cardholder name. This supports full end to end encryption to securely transport this sensitive information.
2. Set PIN : Displays a PIN pad to allow cardholder to set a PIN on their new card. The PIN is end to end encrypted to securely transport this sensitive information
3. Change PIN: Displays two PIN pad to allow the cardholder to change their PIN by providing old & new PIN. The PINs are end to end encrypted to securely transport this sensitive information
4. Verify PIN: Displays a PIN pad to allow cardholder to verify PIN on their card. The PIN is end to end encrypted to securely transport this sensitive information
5. View PIN: Displays a component providing the ability to show PIN card. The PIN is end to end encrypted to securely transport this sensitive information

## Requirements
The Network International React Native Card Management SDK requires minimum react native version 0.71.0 and later and works with iOS version 12 and above.

## Installation
The SDK can be added via [npm](https://docs.npmjs.com) or [yarn](https://classic.yarnpkg.com/). Refer to the CONTRIBUTING.md file for the example app installation steps. 
The SDK requires the following dependencies: react-native-paper, @react-native-community/clipboard, react-native-linear-gradient. If you did not already, please install them before installing the SDK.

##### npm

  - Please install the react-native-paper @react-native-community/clipboard react-native-linear-gradient packages only if you did not already.

```node
npm install react-native-paper @react-native-community/clipboard react-native-linear-gradient
npm install @networkinternational/ni-card-management-sdk
```

#### yarn

  - Please install the react-native-paper @react-native-community/clipboard react-native-linear-gradient packages only if you did not already.

```node
yarn add react-native-paper @react-native-community/clipboard react-native-linear-gradient
yarn add @networkinternational/ni-card-management-sdk
```

### OPTIONAL INTEGRATION STEPS 

In case of issues when running the iOS or the Android application after installing the SDK, try the following steps. 

#### Optional iOS integration steps. 

- Open the iOS project (from the iOS folder: nameOfTheProject.xcworkspace) in Xcode.  
- Remove LaunchScreen.storyboard and Images.xcassets resources from Build Phases -> Copy Bundle Resources 
- Add libNiCardManagementSDK.a in General -> Frameworks, Libraries, and Embedded Content  


#### Optional Android integration steps 

- Open the Android project inside Android Studio 
- Locate build.gradle (Project: NameOfTheProject) file and add the following: 

```java 
   dependencies { 
   ... 
  implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version" 
   ... 
   } 
``` 

- Open AndroidManifest.xml (app -> manifests) and change android:allowBackup from “false” to “true” 

- In case of issues when building from terminal the project, try opening the android project inside Android studio and let it do the indexing and all the other things necessary to sync the project then try again to build it first from Android Studio and then later from terminal 

 
## Integration

#### Basics
    After you have installed the SDK, by following one of the above set of steps, you can import the SDK into your react native app and used it.


#### Usage

###### Create NIInput model

```javascript
    import {
        NiInputInterface, 
        NIConnectionProperties, 
        NIDisplayAttributes, 
        NIThemeEnum, 
        NILanguageEnum,
    } from '@networkinternational/ni-card-management-sdk';

    export const input: NiInputInterface = {
        bankCode: [yourBankCode],
        cardIdentifierId: [cardIdentifierId],
        cardIdentifierType: [cardIdentifierType],
        connectionProperties: NIConnectionProperties = {
            rootUrl: [rootUrl], token: [token],
        },
        displayAttributes: NIDisplayAttributes = {
            theme: NIThemeEnum.light as themeType,
            language: NILanguageEnum.english as languageType,
        },
    };
```

###### Display attributes  
Display attributes parameter is optional. You can set one or more attributes, or even none of them.  

1. Theme

We support dark and light mode, by setting the theme parameter from the display attributes. If the Customer App is in dark mode, then you should use our SDK with dark theme. If the Customer App is in light mode, then you should use our SDK with light theme.  

2. Language

Languages supported are English and Arabic. You can either set the desired language or not. 
If you don’t set any language, it will default to English. 

3. Fonts

We support customization of fonts. System and custom fonts can be set for the labels of each form view.  

4. Card Attributes

Card Attributes is optional. It can be set if customization of the card details view is wanted. 
    
We offer:  
 - Possibility to show or hide card details by default
 
 To directly show the card details (not masked) when card view is displayed, we expect the ```shouldHide``` property to be set to false, otherwise to be set to false. If ```shouldHide``` property is not set, the default value is true.
 
```javascript
    const cardAttributes = NICardAttributes(shouldHide: false)
```

 - Background image customization

For the card background image, we expect a UIImage to be set. The recommended size would be 343 x 182. 

```javascript
    const backgroundImage: ImageURISource = require('../assets/images/background_image.png');
    const cardAttributes = NICardAttributes(backgroundImage: image)) 
```
 - Possibility to set the text position as grouped labels
 
The card details labels are grouped as follows:
 - Card Number Group
    
 - Expiry Date & CVV Group
    
 - Card Holder Name Group
     
In order to set the position of the each group, we expect percentage (of card container view height and width) values to the following parameters: ```leftAlignment```, ```cardNumberGroupTopAlignment```, ```dateCvvGroupTopAlignment```, ```cardHolderNameGroupTopAlignment```

```javascript
    const textPositioning: NICardDetailsTextPositioning = {
        leftAlignment: 0.05,
        cardNumberGroupTopAlignment: 0.4,
        dateCvvGroupTopAlignment: 0.6,
        cardHolderNameGroupTopAlignment: 0.8,
    };
```

All are optional. 

If all properties are wanted, initialization NICardAttributes is made with all properties. 
    
```javascript
    const backgroundImage: ImageURISource = 
      require('../assets/images/background_image.png');
    const textPositioning: NICardDetailsTextPositioning = {
        leftAlignment: 0.05,
        cardNumberGroupTopAlignment: 0.4,
        dateCvvGroupTopAlignment: 0.6,
        cardHolderNameGroupTopAlignment: 0.8,
    };
    const cardAttributes = NICardAttributes(
        shouldHide: false, 
        backgroundImage: image, 
        textPositioning: textPosition) 
```

##### Display Card Details View
The form interface will display the card details in a View.
The card info displayed are: Card Number, Expiry Date, CVV and Cardholder Name.


```javascript
    import {
        CardDetailsComponent,
        type NIErrorResponse,
    } from '@networkinternational/ni-card-management-sdk';
```

```javascript
    <CardDetailsComponent
        input={input}
        callback={(
            error: NIErrorResponse | null,
            result: string | null = null
        ) => {
            callback(); // implement your callback
        }}
    />
```


##### Set PIN Form 
A PIN-pad will be displayed into a separate View on a separate screen. 

```javascript
    import {
        SetPinView,
        type NIErrorResponse,
        NIPinTypeEnum,
    } from '@networkinternational/ni-card-management-sdk';

    import { input } from ['path/to/your/object/config'];
```

by specifying the type (pin length)

```javascript
    const type = NIPinTypeEnum.fourDigits;
```

```javascript
  return (
    <SetPinView
      input={input}
      type={type}
      callback={(
        error: NIErrorResponse | null,
        result: string | null = null
      ) => {
        callback(); // implement your callback
      }}
    />
```

or without specifying the type (pin length)

```javascript
  return (
    <SetPinView
      input={TEST_INPUT}
      callback={(
        error: NIErrorResponse | null,
        result: string | null = null
      ) => {
        callback(); // implement your callback
      }}
    />
```


##### Change PIN Form 
A PIN-pad will be displayed in a VIEW into a separate screen.

    Change PIN is a two step flow:
    1.Capture current PIN 
    2.Capture new PIN 

```javascript
    import {
        ChangePinView,
        type NIErrorResponse,
        NIThemeEnum,
    } from '@networkinternational/ni-card-management-sdk';

    import { input } from ['path/to/your/object/config'];
```

by specifying the type (pin length)

```javascript
    const type = NIPinTypeEnum.fourDigits;
```

```javascript
    <ChangePinView
      input={input}
      type={type}
      callback={(
        error: NIErrorResponse | null,
        result: string | null = null
      ) => {
        console.log('ChangePinView', { error, result });
        callback();  // implement your callback
      }}
    />
```

or without specifying the type (pin length)

```javascript
    <ChangePinView
      input={input}
      callback={(
        error: NIErrorResponse | null,
        result: string | null = null
      ) => {
        console.log('ChangePinView', { error, result });
        callback(); // implement your callback
      }}
    />
```


##### Verify PIN Form 
A PIN-pad will be displayed in a View into a separate screen. 

javascript:
```javascript
    import {
        VerifyPinView,
        type NIErrorResponse,
        NIPinTypeEnum,
    } from '@networkinternational/ni-card-management-sdk';

    import { input } from ['path/to/your/object/config'];
```

by specifying the type (pin length)

```javascript
    const type = NIPinTypeEnum.fourDigits;
```

```javascript
    <VerifyPinView
      input={TEST_INPUT}
      type={type}
      callback={(
        error: NIErrorResponse | null,
        result: string | null = null
      ) => {
        callback(); // implement your callback
      }}
    />
```
or without specifying the type (pin length)

```javascript
    <VerifyPinView
      input={TEST_INPUT}
      callback={(
        error: NIErrorResponse | null,
        result: string | null = null
      ) => {
        callback(); // implement your callback
      }}
    />
```

#### Display as a view
The customer application can integrate Card Details and View Pin as a view into a UIViewController

##### Display Card Details View
A view of NICardView type can be added into a View, then set the input and start the flow as below:

```javascript
    import {
        ViewPinComponent,
        type NIErrorResponse,
        NIPinTypeEnum,
    } from '@networkinternational/ni-card-management-sdk';

    import { input } from ['path/to/your/object/config'];
```

by specifying the type (pin length)

```javascript
    const type = NIPinTypeEnum.fourDigits;
```

```javascript
      <ViewPinComponent
        input={TEST_INPUT_VIEW_PIN}
        type={type}
        callback={(
          error: NIErrorResponse | null,
          result: string | null = null
        ) => {
            callback(); // implement your callback
        }}
      />
```

or without specifying the type (pin length)

```javascript
      <ViewPinComponent
        input={TEST_INPUT_VIEW_PIN}
        callback={(
          error: NIErrorResponse | null,
          result: string | null = null
        ) => {
            callback(); // implement your callback
        }}
      />
```


Parameters: 
- input - type NIInput - see the explanation above. This is a required parameter.
- __timer__ - type number - offers possibility to set the display time of the PIN, expressed in seconds. Using value "0" for this parameter, the PIN will be displayed indefinitely. After the countdown, the PIN will be masked.
This is a required parameter.
- the __timer__ property will be added at input object like below.

```javascript
    export const input: NiInputInterface = {
        bankCode: [yourBankCode],
        cardIdentifierId: [cardIdentifierId],
        cardIdentifierType: [cardIdentifierType],
        connectionProperties: NIConnectionProperties = {
            rootUrl: [rootUrl], token: [token],
        },
        displayAttributes: NIDisplayAttributes = {
            theme: NIThemeEnum.light as themeType,
            language: NILanguageEnum.english as languageType,
        },
        timer: 5,
    };
```


##### Display View Pin View

A view of NIViewPinView type can be added into storyboard, then set the input and start the flow as below:
```javascript
    import {
        ViewPinView,
        type NIErrorResponse,
        NIPinTypeEnum,
    } from '@networkinternational/ni-card-management-sdk';

    import { input } from ['path/to/your/object/config'];
```

by specifying the type (pin length)

```javascript
    const type = NIPinTypeEnum.fourDigits;
```

```javascript
      <ViewPinView
        input={TEST_INPUT_VIEW_PIN}
        type={type}
        callback={(
          error: NIErrorResponse | null,
          result: string | null = null
        ) => {
            callback(); // implement your callback
        }}
      />}
```

or without specifying the type (pin length)

```javascript
      <ViewPinView
        input={TEST_INPUT_VIEW_PIN}
        callback={(
          error: NIErrorResponse | null,
          result: string | null = null
        ) => {
            callback(); // implement your callback
        }}
      />}
```


#### Programatic Interface
The customer application will be responsible to handle the UI part.

##### Retrieve Card Details
The programmatic interface of the card details will return the card details in the getCardDetailsResult: NIGetCardSuccessResponse object.
The card info returned are: Card Number, Expiry Date, CVV and Cardholder Name.

javascript:
```javascript
    import {
        useGetCardDetails,
        type NIErrorResponse,
    } from '@networkinternational/ni-card-management-sdk';
    
    import { input } from ['path/to/your/object/config'];
```

```javascript
  React.useEffect(
    () =>
      onGetCardDetails(
        input,
        (error: NIErrorResponse | null, result: string | null = null) => {
            callback(); // implement your callback
        }
      ),
    []
  );

  const {
    result: getCardDetailsResult,
    error: getCardDetailsError,
    isLoading,
    onGetCardDetails,
  } = useGetCardDetails();

```

##### Set PIN 
The programmatic interface for the Set PIN functionality will return a success or failure response.

javascript:
```javascript
    import {
        useSetPin,
        type NIErrorResponse,
    NIThemeEnum,
    } from '@networkinternational/ni-card-management-sdk';
    
    import { input } from ['path/to/your/object/config'];
```

```javascript
  const newPin = '1234';

  React.useEffect(
    () =>
      onSetPin(
        newPin,
        input,
        (error: NIErrorResponse | null, result: string | null = null) => {
            callback(); // implement your callback
        }
      ),
    []
  );

  const {
    result: setPinResult,
    error: setPinError,
    isLoading,
    onSetPin,
  } = useSetPin();
```


##### Change PIN
The programmatic interface for the Change PIN functionality will return a success or failure response.

javascript:
```javascript
    import {
        useChangePin,
        type NIErrorResponse,
    } from '@networkinternational/ni-card-management-sdk';
    
    import { input } from ['path/to/your/object/config'];
```

```javascript
  const oldPin = '1234';
  const newPin = '7890';

  React.useEffect(
    () =>
      onChangePin(
        oldPin,
        newPin,
        input,
        (error: NIErrorResponse | null, result: string | null = null) => {
            callback(); // implement your callback
        }
      ),
    []
  );

  const {
    result: changePinResult,
    error: changePinError,
    isLoading,
    onChangePin,
  } = useChangePin();
```


##### Verify PIN
The programmatic interface for the Verify PIN functionality will return a success or failure response.

javascript:
```javascript
    import {
        useVerifyPin,
        type NIErrorResponse,
    } from '@networkinternational/ni-card-management-sdk';
    
    import { input } from ['path/to/your/object/config'];
```

```javascript
  const pin = '1234';

  React.useEffect(
    () =>
      onVerifyPin(
        pin,
        input,
        (error: NIErrorResponse | null, result: string | null = null) => {
            callback(); // implement your callback
        }
      ),
    []
  );

  const {
    result: verifyPinResult,
    error: verifyPinError,
    isLoading,
    onVerifyPin,
  } = useVerifyPin();
```


##### View PIN
The programmatic interface for the View PIN functionality will return in __viewPinResult__ as a String value representing the PIN or failure response.

javascript:
```javascript
    import {
        useViewPin,
        type NIErrorResponse,
    } from '@networkinternational/ni-card-management-sdk';
    
    import { input } from ['path/to/your/object/config'];
```

```javascript
  React.useEffect(
    () =>
      onViewPin(
        input,
        (error: NIErrorResponse | null, result: string | null = null) => {
            callback(); // implement your callback
        }
      ),
    []
  );

  const {
    result: viewPinResult,
    error: viewPinError,
    isLoading,
    onViewPin,
  } = useViewPin();
```


### NICardManagement wrapper

A NICardManagement wrapper is used to integrate the Network International SDK into react-native projects, whose methods access the native NiCardManagement SDK.

  - the iOS NICardManagement wrapper can be find inside the __./ios__ folder.

  - the android NICardManagement wrapper can be find inside the __./android/src/main/java/com/nicardmanagement__ folder.
