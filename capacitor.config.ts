import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vira.myroutine',
  appName: 'My Routine',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
