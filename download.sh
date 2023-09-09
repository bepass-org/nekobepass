set -e

dl_and_chmod() {
  curl -Lso tmp.zip "$2"
  unzip -d tmp tmp.zip
  mkdir -p app_bepass/libs/"$1"
  mv "tmp/bepass" app_bepass/libs/"$1"/libepass.so
  rm -rf tmp tmp.zip
}

download_bepass() {
  dl_and_chmod arm64-v8a "https://github.com/uoosef/bepass/releases/download/v1.5.3/Bepass-linux-arm64.4f27e7.zip"
  dl_and_chmod armeabi-v7a "https://github.com/uoosef/bepass/releases/download/v1.5.3/Bepass-linux-arm7.4f27e7.zip"
  dl_and_chmod x86 "https://github.com/uoosef/bepass/releases/download/v1.5.3/Bepass-linux-386.4f27e7.zip"
  dl_and_chmod x86_64 "https://github.com/uoosef/bepass/releases/download/v1.5.3/Bepass-linux-amd64.4f27e7.zip"
}

download_"$1"
