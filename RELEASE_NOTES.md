# React Native Card Management SDK v2.0.0

Status: Draft

Version 2.0.0 updates the SDK and example application for React Native 0.86, React 19, and the current Network International native card-management SDKs. It also aligns Android and iOS bridge behavior, removes obsolete dependencies and generated files, and adds reproducible CI and dependency-update automation.

## Breaking changes and requirements

- React Native `>=0.86.0` is now required. The SDK and example application are tested with React Native `0.86.2`.
- React `>=19.2.7` is now required.
- Node.js `>=22.13.0` is required to build and maintain the repository. This is a development-tooling requirement and does not affect an installed mobile application's runtime.
- The example application uses React Native's New Architecture startup path and requires the generated `ReactNativeApplicationEntryPoint` and `ReactHost` integration.
- `react-native-paper` has been removed. Applications that used it only because it was previously listed by this SDK no longer need to install it.
- Public input types have been clarified: `NIBaseInputInterface` represents the native/base payload, while `NiInputInterface` and `NIInputWithDisplayAttributes` represent UI inputs with display attributes.

## Native SDK updates

- Android `NICardManagementSDK` is pinned to `2.2.2`.
- iOS `NICardManagementSDK` is pinned to `2.1.7`.
- The Android integration now handles the native SDK's `android:allowBackup` manifest merge requirement.
- JitPack repository metadata resolution has been hardened for Android native dependency lookup.

## Bridge and API behavior

- Native errors are normalized before SDK callbacks are invoked, providing a consistent JavaScript error shape for Android string errors and iOS object errors.
- iOS now accepts `connectionProperties.extraHeaders` as a JSON string, matching Android behavior.
- iOS retains `connectionProperties.extraNetworkHeaders` dictionary support for backward compatibility.
- iOS bridge error payload creation is centralized so all card-management operations return consistent error fields.
- Change PIN, set PIN, and verify PIN hook commands now have stable callback identities, avoiding unnecessary effect reruns in React consumers.

## React Native 0.86 compatibility

- Android application startup delegates to React Native's generated application entry point.
- The example Android application exposes the required `ReactHost` for New Architecture rendering.
- The obsolete, release-only `ReactNativeFlipper.java` no-op scaffold has been removed. It did not initialize Flipper or import Flipper libraries, and no Flipper dependency remains in the JavaScript, Android, or iOS dependency graphs. Flipper was a desktop debugging platform for inspecting network traffic, logs, React components, layouts, and databases; React Native no longer includes this integration in current templates and React Native DevTools is the supported replacement. This does not change application runtime behavior.
- Jetifier has been disabled. Jetifier rewrites dependencies that still reference the legacy Android Support Library (`android.support.*`) to AndroidX (`androidx.*`), but the SDK's current dependency graph is already AndroidX-native. Removing it avoids unnecessary dependency transformation during Android builds.
- Jetifier should only be restored if a future dependency still ships legacy `android.support.*` references and fails to build without rewriting.
- iOS pods and Hermes dependencies have been refreshed for React Native `0.86.2`.
- React 19 effect handling in the example application now uses `useEffectEvent` where callbacks need current values without retriggering effects.
- A temporary JSX compatibility declaration is retained for React 19 and TypeScript migration compatibility.

## Repository and example improvements

- Generated Android, Gradle, CMake, CocoaPods, Xcode, library, and coverage outputs are excluded from source control.
- Duplicate iOS application icon metadata has been removed.
- Example configuration state is centralized in `useSampleConfig`, leaving card-detail UI components presentational.
- Example toggle controls use typed, accessible React Native primitives, and remaining `any` props have been removed from example source.
- The supported toolchain and setup workflow are documented in `README.md` and `CONTRIBUTING.md`.
- CI now validates type checking, linting, tests, Android builds, iOS builds, and generated-file hygiene.
- Renovate is configured to propose grouped stable React Native ecosystem updates without adding an upper bound to the public React Native peer range.

## Upgrade guidance

1. Upgrade the host application to React Native `0.86.x` and React `19.2.7` or newer compatible versions.
2. Install the SDK peer dependencies:

   ```sh
   yarn add @react-native-clipboard/clipboard react-native-linear-gradient
   ```

3. On iOS, update pods after changing the SDK version:

   ```sh
   cd ios
   bundle exec pod install --repo-update
   ```

4. On Android, ensure the host application uses JDK 17, Android SDK 36, Build Tools 36.0.0, NDK 28.2.13676358, and CMake 3.22.1.
5. If the host application consumes custom network headers, continue passing `connectionProperties.extraHeaders` as a JSON string. The legacy iOS-only `extraNetworkHeaders` dictionary remains supported but should not be used for new integrations.

## Validation

The release candidate has been validated with:

- TypeScript type checking
- Jest tests
- ESLint with no errors
- Android debug application build
- iOS simulator application build
- SDK CommonJS, ES module, and TypeScript declaration builds
- Immutable Yarn installation
- npm package dry run
- CI and Renovate configuration parsing
- Generated-output tracking audit

Known non-blocking output is limited to existing React Native inline-style lint warnings and upstream Yarn peer-dependency warnings from React Native tooling presets.