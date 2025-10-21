/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primary = '#34D399'; // Accent color from SignIn/SignUp screens
const background = '#1C2C35'; // Background color from SignIn/SignUp screens

export const Colors = {
  light: {
    // TODO: Define light theme colors based on your design
    text: '#11181C',
    background: '#fff',
    tint: primary,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primary,
  },
  dark: {
    text: '#FFFFFF',
    secondaryText: 'rgba(255, 255, 255, 0.7)',
    background: background,
    tint: primary,
    icon: 'rgba(255, 255, 255, 0.7)',
    tabIconDefault: 'rgba(255, 255, 255, 0.7)',
    tabIconSelected: primary,
  },
};
