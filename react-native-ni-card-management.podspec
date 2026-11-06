require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

repository = package["repository"]
source_url = repository.is_a?(Hash) ? repository["url"] : repository
source_url = package["homepage"] if source_url.nil? || source_url.empty?
source_url = source_url.to_s.gsub(/^git\+/, '').gsub(/\.git$/, '')

Pod::Spec.new do |s|
  s.name         = "react-native-ni-card-management"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "15.1" }
  s.source       = { :git => source_url, :tag => "v#{s.version}" }
  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.exclude_files = "ios/NiCardManagement-Bridging-Header.h"
  s.swift_version = "5.0"

  # Core is SPM/binary-only. Fetch XCFramework from the public Release (no UI SDK).
  core_version = "0.1.1"
  s.prepare_command = <<-CMD
    set -euo pipefail
    VERSION="#{core_version}"
    ZIP="NICardManagementSDKCore.xcframework.zip"
    URL="https://github.com/network-international/card-management-sdk-core/releases/download/${VERSION}/${ZIP}"
    mkdir -p ios/Frameworks
    if [ ! -d "ios/Frameworks/NICardManagementSDKCore.xcframework" ]; then
      curl -fsSL -o "ios/Frameworks/${ZIP}" "${URL}"
      unzip -qo "ios/Frameworks/${ZIP}" -d ios/Frameworks
      rm -f "ios/Frameworks/${ZIP}"
    fi
  CMD
  s.vendored_frameworks = "ios/Frameworks/NICardManagementSDKCore.xcframework"

  # Use install_modules_dependencies helper to install the dependencies if React Native version >=0.71.0.
  # See https://github.com/facebook/react-native/blob/febf6b7f33fdb4904669f99d795eba4c0f95d7bf/scripts/cocoapods/new_architecture.rb#L79.
  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    s.dependency "React-Core"

    # Don't install the extra dependencies when we run `pod install` in the old architecture.
    if ENV['RCT_NEW_ARCH_ENABLED'] == '1'
      s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
      s.pod_target_xcconfig = {
        "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
        "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
        "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
      }
      s.dependency "React-Codegen"
      s.dependency "RCT-Folly"
      s.dependency "RCTRequired"
      s.dependency "RCTTypeSafety"
      s.dependency "ReactCommon/turbomodule/core"
    end
  end
end
