# Capacitor Android Setup Guide

This project has been configured to build an Android APK using Capacitor.

## Prerequisites

1. **Node.js** (v18+)
2. **npm** or **yarn**
3. **Java Development Kit (JDK)** 17 or higher
4. **Android SDK** (Android Studio recommended)
5. **Android SDK Build Tools** (version 34+)

## Local Setup (One-time)

If you want to build the APK locally on your machine:

```bash
# 1. Install dependencies
npm ci

# 2. Build the web app
npm run build

# 3. Initialize/sync Capacitor Android project
npx cap add android
npx cap sync android

# 4. Open Android Studio to build the APK
npx cap open android
```

In Android Studio:
- Select **Build > Build Bundle(s) / APK(s) > Build APK(s)**
- The APK will be generated in `android/app/build/outputs/apk/debug/app-debug.apk`

## GitHub Actions (Automated)

The repository includes a GitHub Actions workflow (`.github/workflows/build-apk.yml`) that automatically builds the APK on every push to `main` or when manually triggered.

### To Trigger the Build:

1. Go to: **https://github.com/vira-mere/my-routine/actions**
2. Click on the **"Build Android APK"** workflow
3. Click **"Run workflow"** (top right)
4. Select the branch (default: `main`)
5. Click **"Run workflow"** button

### To Download the APK:

1. Wait for the workflow to complete (usually 5-10 minutes)
2. Click on the successful workflow run
3. Scroll down to the **Artifacts** section
4. Download **"My-Routine-APK"** → **"My-Routine.apk"

## Project Structure

```
my-routine/
├── .github/
│   └── workflows/
│       └── build-apk.yml          # GitHub Actions workflow
├── android/                        # Android project (generated)
│   ├── app/
│   ├── gradle/
│   ├── gradlew                     # Gradle wrapper
│   └── build.gradle
├── src/                            # React source code
├── capacitor.config.ts             # Capacitor configuration
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
└── CAPACITOR_SETUP.md             # This file
```

## NPM Scripts

- `npm run dev` - Start development server
- `npm run build` - Build web app for Capacitor/APK
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages
- `npm run cap:sync` - Sync web app to Android project
- `npm run android:build` - Build APK locally

## Important Notes

- The APK is built in **DEBUG mode** (for development/testing)
- No signing key is required for debug APKs
- The app will only run on Android devices or emulators
- The `dist/` folder must exist before building Android (created by `npm run build`)
- The GitHub Actions workflow runs on Ubuntu and handles all setup automatically

## Troubleshooting

### "Android project not found" error
- Run: `npx cap add android && npx cap sync android`

### "gradlew not executable" error
- Run: `chmod +x android/gradlew`

### Build fails with "Java version" error
- Ensure JDK 17+ is installed and set as `JAVA_HOME`

### APK not generated
- Check the workflow logs in GitHub Actions for specific error messages
- Ensure `npm run build` succeeds locally first

## Next Steps

1. Push changes to the repository
2. GitHub Actions will automatically build the APK
3. Download the APK from the Actions artifacts
4. Install on an Android device: `adb install My-Routine.apk`
