import 'dotenv/config';

export default {
  "expo": {
    "name": "Panga",
    "slug": "Panga",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "description": "",
    "githubUrl": "https://github.com/Kelvince01/Panga.git",
    "scheme": "Panga",
    "privacy": "public",
    "sdkVersion": "46.0.0",
    "notification": {
      "icon": "./assets/notification-icon.png",
      "androidMode": "default"
    },
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "green"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "ios": {
      "bundleIdentifier": "com.kelvince.Panga",
      "supportsTablet": true,
      "infoPlist": {
        "UIBackgroundModes": [
          "location",
          "fetch"
        ],
        "LSApplicationQueriesSchemes": [
          "transportili"
        ],
        "NSCameraUsageDescription": "L'application utilise l'appareil photo pour prendre une photo ou numériser vos documents.",
        "NSLocationWhenInUseUsageDescription": "L'application utilise votre position pour aider les chauffeurs ou les transporteurs à vous trouver sur la carte."
      },
      "config": {
        "googleMapsApiKey": "AIzaSyA8Wcik6dTuxBKolLSm5ONBvXNz8Z0T-6c"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.kelvince.Panga",
      "versionCode": 6,
      "permissions": [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION"
      ],
      "config": {
        "googleMaps": {
          "apiKey": "AIzaSyA8Wcik6dTuxBKolLSm5ONBvXNz8Z0T-6c"
        }
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "@react-native-firebase/app"
    ],
    "extra": {
      "eas": {
        "projectId": "bc6f39fe-1f48-4570-8b10-1e0d0f744d3a"
      },
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID
    }
  }
}
