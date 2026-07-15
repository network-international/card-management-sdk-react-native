# Migration Plan Notes

Date: 2026-07-15

## 1) react-native-paper Removal Design

### Current usage inventory

- SDK package
  - src/components/NIButton/NIButton.tsx
    - Uses Button from react-native-paper.
- Example app
  - example/src/components/NIButton.tsx
    - Uses Button from react-native-paper.
  - example/src/components/TextInputManagementCardDetail.tsx
    - Uses TextInput from react-native-paper.
  - example/src/components/ManagementCardDetail.tsx
    - Uses TextInput from react-native-paper.

### Behavior currently relied on

- NIButton
  - Mostly used with mode="text" and custom textColor.
  - Wrapped in LinearGradient for background styling.
  - Disabled/opacity states are used.
- Example form TextInput
  - Uses floating label style from Paper TextInput.
  - Numeric keyboard and decimal input modes are used in config fields.

### Removal strategy

#### Phase A: Introduce local replacements (no public API break)

- SDK
  - Replace src/components/NIButton/NIButton.tsx internals with Pressable + Text.
  - Keep NIButton props stable for compatibility.
  - Implement mode mapping locally:
    - text: transparent background, text emphasis.
    - contained: filled background.
    - outlined: transparent with border.
    - Other modes mapped to nearest visual style used today (text/contained).

- Example
  - Replace example/src/components/NIButton.tsx internals the same way.
  - Create a local labeled input component using View + Text + TextInput from react-native.
  - Replace usage in:
    - example/src/components/TextInputManagementCardDetail.tsx
    - example/src/components/ManagementCardDetail.tsx

#### Phase B: Remove dependency declarations

- Remove react-native-paper from:
  - root package devDependencies and peerDependencies.
  - example/package.json dependencies.
- Update README dependency install commands and dependency list.

#### Phase C: Validate and harden

- Validate:
  - yarn workspace react-native-ni-card-management-example build:android
  - yarn workspace react-native-ni-card-management-example build:ios
  - Manual visual checks for:
    - main menu buttons
    - management form inputs
    - disabled states
- Add one snapshot or component test for NIButton rendering states.

### Risks and mitigations

- Risk: visual regression from Paper label animations.
  - Mitigation: simple static top labels in example config UI are acceptable for migration.
- Risk: mode compatibility expectations in external integrators.
  - Mitigation: keep props and mode enum unchanged; map unsupported modes deterministically.

## 2) Local iOS SDK Source Analysis

### Files reviewed

- ios/NiCardManagement.swift
- ios/NiCardManagement.mm

### Summary

- Native module exposes bridge methods:
  - getCardDetails
  - setPin
  - changePin
  - verifyPin
  - getPin
- Error payload shape from iOS is object-based and includes:
  - domain
  - code (numeric)
  - message

### Input contract observations

- iOS currently reads connection properties from NSDictionary.
- iOS currently parses extraNetworkHeaders dictionary fallback.
- There is no parsing of connectionProperties.extraHeaders JSON string in the current file.

### Migration implication

- For cross-platform consistency, iOS should accept extraHeaders JSON string (same logical field used by JS/Android) while preserving backward compatibility for extraNetworkHeaders dictionary.

## 3) Local Android SDK Source Analysis

### Files reviewed

- android/src/main/java/com/nicardmanagement/NiCardManagementPackage.kt
- android/src/main/java/com/nicardmanagement/NiCardManagementModule.kt
- android/src/main/java/com/nicardmanagement/JsonDeserialization.kt

### Summary

- Android module exposes same functional surface as iOS:
  - getCardDetails, setPin, changePin, verifyPin, getPin
- Calls into ae.network.nicardmanagementsdk.api.implementation.NICardManagement.
- Error path currently returns plain string messages through callback first arg.

### Input contract observations

- Android deserialization expects connectionProperties.extraHeaders as a JSON string and parses it into map headers.
- This aligns with JS NIConnectionProperties.extraHeaders typing.

### Migration implication

- Keep JS-to-Android serialization path unchanged.
- Continue normalizing errors in JS hooks so Android string errors and iOS object errors are consistently exposed.

## 4) Cross-Platform Contract Follow-up

### High-priority mismatches to address next

- Align iOS connection headers handling with Android by supporting extraHeaders JSON string input.
- Keep extraNetworkHeaders dictionary support on iOS for backward compatibility.

### Type-level cleanup identified

- src/interfaces/NiInputInterfaces.ts currently imports NIInputInterface and redeclares interface NiInputInterface extending itself by name, which is confusing and should be refactored in a dedicated typings cleanup pass.

## 5) Validation And Documentation Closure (Step 2)

### Final native dependency state

- Android native SDK pin is `2.2.2` in `android/gradle.properties` (`NiCardManagement_nativeSdkVersion`).
- iOS native SDK pin is `2.1.7` in `react-native-ni-card-management.podspec` (`s.dependency "NICardManagementSDK", '2.1.7'`).

### Android integration fixes applied

- JitPack metadata reliability fix:
  - `android/build.gradle` now configures `https://jitpack.io` with:
    - `metadataSources { mavenPom(); artifact(); }`
- Manifest merge fix for Android SDK 2.2.2:
  - `example/android/app/src/main/AndroidManifest.xml` adds `xmlns:tools`.
  - `<application ... tools:replace="android:allowBackup" ...>` resolves `allowBackup` conflict with SDK manifest.

### Validation snapshot

- iOS and Android example builds pass with current pins/fixes.
  - Android: `yarn workspace react-native-ni-card-management-example build:android` -> `BUILD SUCCESSFUL`.
  - iOS: `yarn workspace react-native-ni-card-management-example build:ios` -> `** BUILD SUCCEEDED **`.
- Typecheck remains green after input/interface and bridge compatibility updates.
- Example scripts now run `check:node` before Metro start commands to fail fast with a clear message when Node is below `22.11.0` (avoids opaque Metro `configs.toReversed is not a function` failures under Node 18).

## 6) Flutter SDK Pattern Review (Step 3)

### Sources reviewed

- Flutter plugin repository: `network-international/card-management-sdk-flutter`
- pub.dev package: `card_management_sdk` (v0.1.6)

### Flutter public model (observed)

- Session-style setup via one-time `initialize(...)` with:
  - `token`, `rootUrl`, `bankCode`, `cardIdentifierId`, `cardIdentifierType`
  - optional `debugLogToConsole`
  - optional `extraNetworkHeaders: Map<String, String>`
- Operations are invoked after initialization:
  - `getCardDetails`, `setPin`, `verifyPin`, `changePin`, `getPin`
- Error handling is surfaced as exceptions / `PlatformException` on the Dart side.

### RN model vs Flutter model

- RN uses per-operation/per-component input (`NiInputInterface`) from JS.
- Flutter stores initialized native context once and reuses it for subsequent calls.
- RN cross-platform header transport standard is `connectionProperties.extraHeaders` JSON string.
- Flutter transport uses typed map directly as `extraNetworkHeaders`.

### Interop takeaway

- Current RN bridge behavior is intentionally valid and stable:
  - Android consumes JSON-string headers (`extraHeaders`) directly.
  - iOS now supports JSON-string headers plus dictionary fallback for older inputs.
- No immediate contract break is required to match Flutter shape; any move to explicit RN `initialize(...)` should be treated as a future API design change, not a migration blocker.