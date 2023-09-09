set -e

dl_and_chmod() {
  curl -Lso tmp.zip "$2"
  unzip -d tmp tmp.zip
  mkdir -p app_bepass/libs/"$1"
  mv "tmp/bepass" app_bepass/libs/"$1"/libepass.so
  rm -rf tmp tmp.zip
}

download_bepass() {
  dl_and_chmod arm64-v8a "https://github.com/uoosef/bepass/releases/download/v1.5.0/Bepass-linux-arm64.41ac51.zip"
  dl_and_chmod armeabi-v7a "https://github.com/uoosef/bepass/releases/download/v1.5.0/Bepass-linux-arm7.41ac51.zip"
  dl_and_chmod x86 "https://github.com/uoosef/bepass/releases/download/v1.5.0/Bepass-linux-386.41ac51.zip"
  dl_and_chmod x86_64 "https://github.com/uoosef/bepass/releases/download/v1.5.0/Bepass-linux-amd64.41ac51.zip"
}

download_"$1"
