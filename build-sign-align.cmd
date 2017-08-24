rem Remember to up android version number in config.xml
ionic cordova build android --prod --release

"C:\Program Files (x86)\Java\jdk1.7.0_55\bin\jarsigner" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore "c:\dev\active\platforms\android\build\outputs\apk\android-release-unsigned.apk" activekey -storepass "Disco2000"

"C:\Program Files\Java\jdk1.8.0_144\bin\jarsigner" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore "c:\Users\AlexC.M_BLACKWOOD\Source\Workspaces\ionic-2\Active\platforms\android\build\outputs\apk\android-release-unsigned.apk" activekey -storepass "Disco2000"

del BlackwoodActive.apk

"c:\Program Files (x86)\Android\android-sdk\build-tools\23.0.1\zipalign.exe" -v 4 c:\dev\Active\platforms\android\build\outputs\apk\android-release-unsigned.apk BlackwoodActive.apk

"c:\Program Files (x86)\Android\android-sdk\build-tools\23.0.1\zipalign.exe" -v 4 c:\Users\AlexC.M_BLACKWOOD\Source\Workspaces\ionic-2\Active\platforms\android\build\outputs\apk\android-release-unsigned.apk BlackwoodActive.apk

echo "APK Built, Signed & Aligned"

rem "\Program Files (x86)\Android\android-sdk\platform-tools\adb.exe" install BlackwoodActive.apk"