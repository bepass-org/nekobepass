set -e

# moe.matsur.exe.* -> no js build

HTML=../app_$1/html
SRC=./plugin_$1

webpack --entry "$SRC"/main.js

rm -rf "$HTML"
mkdir -p "$HTML"
cp plugin.html "$HTML"
cp dist/p.js "$HTML"
