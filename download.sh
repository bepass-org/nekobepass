set -e

dl_and_chmod() {
  curl -Lso tmp.zip "$2"
  unzip -d tmp tmp.zip
  mkdir -p app_bepass/libs/"$1"
  mv "tmp/bepass" app_bepass/libs/"$1"/libepass.so
  rm -rf tmp tmp.zip
}

download_bepass() {
  dl_and_chmod arm64-v8a "https://github.com/uoosef/bepass/releases/download/v1.4.0-beta/Bepass-linux-arm64.dc8363.zip"
  dl_and_chmod armeabi-v7a "https://github.com/uoosef/bepass/releases/download/v1.4.0-beta/Bepass-linux-arm7.dc8363.zip"
  dl_and_chmod x86 "https://github.com/uoosef/bepass/releases/download/v1.4.0-beta/Bepass-linux-386.dc8363.zip"
  dl_and_chmod x86_64 "https://github.com/uoosef/bepass/releases/download/v1.4.0-beta/Bepass-linux-amd64.dc8363.zip"
}

download_"$1"
