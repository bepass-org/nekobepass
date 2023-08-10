plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

setupAll()

android {
    defaultConfig {
        applicationId = "moe.matsuri.plugin.bepass"
        versionCode = 1
        versionName = "1.2.1"
    }
}
