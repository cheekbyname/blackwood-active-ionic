cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore "c:\dev\active\platforms\android\build\outputs\apk\android-release-unsigned.apk" activekey
del BlackwoodActive.apk
"c:\Program Files (x86)\Android\android-sdk\build-tools\23.0.1\zipalign.exe" -v 4 c:\dev\Active\platforms\android\build\outputs\apk\android-release-unsigned.apk BlackwoodActive.apk
echo "APK Built, Signed & Aligned"
