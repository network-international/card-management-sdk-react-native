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
The SDK supports React Native 0.86.0 and later and iOS 15.1 and later. The repository and example app pin React Native 0.86.2, which is the currently tested and recommended version. Newer stable React Native versions are allowed by the peer dependency and become officially tested when the repository's automated dependency update passes Android and iOS CI.

Development requires the following toolchain:

| Tool | Version |
| --- | --- |
| Node.js | 22.13.0 or newer in the Node 22 LTS line |
| Yarn | 3.6.1, provided by the repository |
| JDK | 17 |
| Android SDK Platform | 36 |
| Android Build Tools | 36.0.0 |
| Android NDK | 28.2.13676358 (r28c) |
| CMake | 3.22.1 |
| Xcode | A version that supports the installed iOS SDK and iOS 15.1 deployment target |

Gradle 9.3.1 is downloaded by the wrapper. React Native, the React Native CLI, the Android Gradle Plugin, and Kotlin are installed through Yarn and Gradle and do not need separate global installations.

## Installation
The SDK can be added via [npm](https://docs.npmjs.com) or [yarn](https://classic.yarnpkg.com/). Refer to the CONTRIBUTING.md file for the example app installation steps. 
The SDK requires the following dependencies: @react-native-clipboard/clipboard, react-native-linear-gradient. If you did not already, please install them before installing the SDK.

##### npm

  - Please install the @react-native-clipboard/clipboard react-native-linear-gradient packages only if you did not already.

```node
npm install @react-native-clipboard/clipboard react-native-linear-gradient
npm install @networkinternational/ni-card-management-sdk
```

#### yarn

  - Please install the @react-native-clipboard/clipboard react-native-linear-gradient packages only if you did not already.

```node
yarn add @react-native-clipboard/clipboard react-native-linear-gradient
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
    After you have installed the SDK, by following one of the above set of steps, you can import the SDK into your react native app and use it.


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
        connectionProperties: {
            rootUrl: [rootUrl],
            token: [token],
            extraHeaders: JSON.stringify({
              'custom-header': 'custom-value',
            }),
        },
        displayAttributes: {
            theme: NIThemeEnum.light as themeType,
            language: NILanguageEnum.english as languageType,
        },
    };
```

`connectionProperties.extraHeaders` should be a JSON string representation of key/value headers.
For backward compatibility, iOS also accepts `extraNetworkHeaders` as a dictionary when provided by older integrations.

##### Native callback contract

All SDK callbacks return `(error, result)`:

- On success: `error` is `null` and `result` is populated.
- On failure: `result` is `null` and `error` is normalized to:

```typescript
type NIErrorResponse = {
  domain: string;
  code: string | number;
  message: string;
};
```

On `CardDetailsComponent` success, the callback result message is
`"Card details retrieved with success!"`; card details data is exposed through the
component/hook state (`getCardDetailsResult`).

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

    import { input } from 'path/to/your/object/config';
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

    import { input } from 'path/to/your/object/config';
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

```javascript
    import {
        VerifyPinView,
        type NIErrorResponse,
        NIPinTypeEnum,
    } from '@networkinternational/ni-card-management-sdk';

    import { input } from 'path/to/your/object/config';
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

    import { input } from 'path/to/your/object/config';
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
        connectionProperties: {
            rootUrl: [rootUrl],
            token: [token],
            extraHeaders: JSON.stringify({
              'custom-header': 'custom-value',
            }),
        },
        displayAttributes: {
            theme: NIThemeEnum.light as themeType,
            language: NILanguageEnum.english as languageType,
        },
        timer: 5,
    };
```


##### Display View Pin Component

A ViewPinComponent can be added into your screen, then set the input and start the flow as below:
```javascript
    import {
    ViewPinComponent,
        type NIErrorResponse,
        NIPinTypeEnum,
    } from '@networkinternational/ni-card-management-sdk';

  import { input } from 'path/to/your/object/config';
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


#### Programmatic Interface
The customer application will be responsible to handle the UI part.

##### Retrieve Card Details
The programmatic interface of the card details will return the card details in the getCardDetailsResult: NIGetCardSuccessResponse object.
The card info returned are: Card Number, Expiry Date, CVV and Cardholder Name.

```javascript
    import {
        useGetCardDetails,
        type NIErrorResponse,
    } from '@networkinternational/ni-card-management-sdk';
    
    import { input } from 'path/to/your/object/config';
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

```javascript
    import {
        useSetPin,
        type NIErrorResponse,
    } from '@networkinternational/ni-card-management-sdk';
    
    import { input } from 'path/to/your/object/config';
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

```javascript
    import {
        useChangePin,
        type NIErrorResponse,
    } from '@networkinternational/ni-card-management-sdk';
    
    import { input } from 'path/to/your/object/config';
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

```javascript
    import {
        useVerifyPin,
        type NIErrorResponse,
    } from '@networkinternational/ni-card-management-sdk';
    
    import { input } from 'path/to/your/object/config';
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

```javascript
    import {
        useViewPin,
        type NIErrorResponse,
    } from '@networkinternational/ni-card-management-sdk';
    
  import { input } from 'path/to/your/object/config';
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

### Code shrinking and obfuscation (ProGuard / R8 / DexGuard)

The Android card-management flows generate an in-memory, self-signed X.509 certificate with BouncyCastle and use its key pair for encryption and decryption. `BouncyCastleProvider` resolves every algorithm reflectively by class name (for example `org.bouncycastle.jcajce.provider.asymmetric.RSA$Mappings`). If those classes are renamed, removed or encrypted by a shrinker, the lookup fails and every SDK operation reports:

```
No provider succeeded to generate a self-signed certificate. See debug log for the root cause.
```

The real cause is only visible via `adb logcat -s SelfSignedCertificate:D`.

#### R8 and ProGuard

No action is required. Native Android SDK `2.3.0` and later declare the necessary keep rules through `consumerProguardFiles`, and they are merged into your application's shrinker configuration automatically, including under R8 full mode. Do not add `-dontobfuscate` workarounds or remove those rules.

If you are pinned to an older SDK release that predates those rules, add them to your own `proguard-rules.pro`:

```
-keep class org.bouncycastle.** { *; }
-dontwarn org.bouncycastle.**
-keepclassmembers class * extends java.security.Provider { <init>(...); }
-keep class ae.network.nicardmanagementsdk.** { *; }
-keepclassmembers class ae.network.nicardmanagementsdk.** { *; }
-keepattributes Exceptions, InnerClasses, Signature, EnclosingMethod, *Annotation*
```

#### DexGuard

DexGuard applies the packaged consumer rules as well, but its additional protections are not covered by keep rules. Exclude the cryptography classes from name obfuscation, class encryption, string encryption and reflection obfuscation in your DexGuard configuration:

```
-keep,allowoptimization class org.bouncycastle.** { *; }
-keep,allowoptimization class ae.network.nicardmanagementsdk.** { *; }

# Do not apply DexGuard encryption or reflection obfuscation to these packages.
-keepresourcefiles META-INF/services/**
```

In addition, make sure `org.bouncycastle.**` and `ae.network.nicardmanagementsdk.**` are not listed in any `-encryptclasses`, `-encryptstrings` or `-obfuscatereflection` directive, and that `META-INF/services` entries are retained when repackaging.

#### Verifying a protected build

1. Build a minified release: `yarn workspace react-native-ni-card-management-example build:android:release`.
2. Confirm BouncyCastle survived: `grep org.bouncycastle example/android/app/build/outputs/mapping/release/mapping.txt` should list unrenamed classes.
3. Confirm a single BouncyCastle version is on the classpath: `cd example/android && ./gradlew :app:dependencies --configuration releaseRuntimeClasspath | grep -i bouncy`.
4. Run Card Details, Set PIN, Verify PIN, Change PIN and View PIN against the release build.

The example application keeps `minifyEnabled` and R8 full mode enabled for release builds, with an intentionally empty `example/android/app/proguard-rules.pro`, so it acts as a regression guard for the keep rules shipped by the native SDK.

### Inspecting network traffic

Card-management operations cross the React Native bridge and execute inside the native `NICardManagementSDK`. They are not JavaScript `fetch` or `XMLHttpRequest` calls, so use the native platform inspector when investigating Card Details, Set PIN, Verify PIN, Change PIN, or View PIN traffic.

#### Android native SDK traffic

The Android SDK uses Retrofit and OkHttp, which are supported by Android Studio Network Inspector:

1. Run a debug build of the example application on an emulator or connected device.
2. Open `example/android` in Android Studio.
3. Select **View > Tool Windows > App Inspection**.
4. Select the device and the `com.nicardmanagementexample` process.
5. Open the **Network Inspector** tab before triggering an SDK operation.
6. Trigger the operation in the example app, select its request in **Connection View**, and inspect its URL, method, status, timings, headers, body, and call stack where available.

If the process is not listed, launch the debug app from Android Studio or attach the debugger to `com.nicardmanagementexample`. If traffic is still absent, restart the debug app while App Inspection is open and confirm that input validation or authentication did not fail before the native SDK attempted the request.

#### iOS native SDK traffic

The iOS SDK uses `URLSession`, so inspect its requests with the HTTP Traffic instrument included with Xcode:

1. Open `example/ios/NiCardManagementExample.xcworkspace` in Xcode.
2. Select the `NiCardManagementExample` scheme and an iOS Simulator or connected device.
3. Select **Product > Profile** to launch Instruments.
4. Select the **Network** template and click **Choose**.
5. Confirm that Instruments targets the `NiCardManagementExample` process, then click **Record**.
6. Read the capture warning and select **Record Anyway** only when using test or UAT data.
7. Trigger an SDK operation in the example app and stop the recording when the request completes.
8. Expand **HTTP Traffic > NiCardManagementExample > URLSession > domain**, then select a task or transaction to inspect timing, request and response headers, bodies, and the initiating backtrace where available.

The current native SDK uses both shared and ephemeral `URLSession` instances; both are visible to the HTTP Traffic instrument. If no transaction appears, begin recording before triggering the operation and confirm that the request was not rejected by local validation or authentication setup.

Instruments records decrypted HTTP and HTTPS headers and bodies in the trace document and system logs without encryption. Treat `.trace` files as sensitive artifacts: do not commit them, attach them to public issues, or retain captures containing production credentials or cardholder data.

#### React Native JavaScript traffic

React Native 0.86 DevTools includes a Network panel for requests made through React Native networking. Press `j` in the Metro terminal, or choose **Open DevTools** from the application developer menu, then select **Network** and trigger the request. This panel is useful for JavaScript networking but may not display requests initiated by `NICardManagementSDK`; Android Studio or Xcode tooling is authoritative for native SDK traffic.

#### Proxy tools and sensitive data

Proxyman or Charles can be used as a fallback when a platform inspector cannot observe a request, but HTTPS certificate pinning may prevent proxy decryption. Do not disable transport security or certificate pinning in production code to support inspection.

Inspect only test or UAT traffic. Requests can contain authentication tokens, card identifiers, PIN-related values, and card details. Do not enable BODY-level HTTP logging, commit captures, or share unredacted request headers and payloads.

### Maintainer notes

- CocoaPods source tags use `v{version}` format and are resolved from `repository` metadata (fallback to `homepage`).
- Android native SDK version is centralized in `android/gradle.properties` via `NiCardManagement_nativeSdkVersion`.
- iOS native SDK version is pinned in `react-native-ni-card-management.podspec` via `s.dependency "NICardManagementSDK", '...'`; keep this aligned with `NiCardManagement_nativeSdkVersion`.
- Current validated native pins are Android `2.3.0` (`NiCardManagement_nativeSdkVersion`) and iOS `2.1.7` (`NICardManagementSDK` pod dependency).
- Android library-side New Architecture is opt-in via `NiCardManagement_newArchEnabled`; keep it disabled by default so app-level `newArchEnabled=true` does not make the SDK module run React codegen for third-party dependency specs (which can cause duplicate generated classes such as `RNCSafeAreaProviderManagerDelegate`).
- Flipper was a desktop debugging platform for inspecting network traffic, logs, React components, layouts, and databases. React Native no longer includes the generated Flipper integration in current templates, so the obsolete, release-only `ReactNativeFlipper.java` no-op scaffold was removed. It did not initialize Flipper or import Flipper libraries, and no Flipper dependency remains in the JavaScript, Android, or iOS dependency graphs. Use React Native DevTools for the supported debugging workflow; removing the scaffold does not affect application runtime behavior.
- Jetifier rewrites dependencies from the legacy Android Support Library (`android.support.*`) to AndroidX (`androidx.*`). It is disabled because the current dependency graph is AndroidX-native, avoiding unnecessary transformation during builds. Restore `android.enableJetifier=true` only if a future dependency still contains legacy support-library references and fails to build without rewriting.
- If Metro start fails with `EADDRINUSE` on `:8081`, either stop the existing process using that port or run the example app on an alternate port with `yarn workspace react-native-ni-card-management-example start:8082`.
- Example app start scripts are guarded by `check:node` and require Node `>=22.13.0`; older runtimes can fail with Metro errors such as `configs.toReversed is not a function`.
- iOS bridge now accepts `connectionProperties.extraHeaders` as a JSON string (same contract as Android). `connectionProperties.extraNetworkHeaders` dictionary remains supported as a backward-compatible fallback.
- Android 2.2.2 integration may require manifest merge override for `android:allowBackup`; the example app resolves this in `example/android/app/src/main/AndroidManifest.xml` using `tools:replace="android:allowBackup"`.
- JitPack timeouts/resolution flakiness for Android metadata were mitigated in `android/build.gradle` by setting repository metadata sources to `mavenPom()` and `artifact()` for `https://jitpack.io`.
- RN and Flutter integration models differ by design:
  - Flutter initializes once with `initialize(...)` and passes `extraNetworkHeaders` as a map.
  - RN passes `NiInputInterface` per call/component and uses `connectionProperties.extraHeaders` JSON string as the cross-platform transport shape.
- iOS RN 0.86.x + RCT-Folly may fail with `folly/coro/Coroutine.h file not found` in some pod resolutions. The example app Podfile includes a temporary post-install workaround in `example/ios/Podfile` that disables coroutine-only include blocks in `RCT-Folly/folly/Expected.h` and `RCT-Folly/folly/Optional.h` only when `folly/coro/Coroutine.h` is absent.
- Remove that workaround once the installed `RCT-Folly` package consistently includes `folly/coro/Coroutine.h` (or when upgrading RN/Folly versions where this mismatch is fixed).
