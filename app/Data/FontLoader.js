import React from 'react';
import { useFonts, RobotoSlab_400Regular, RobotoSlab_700Bold, RobotoSlab_500Medium, RobotoSlab_800ExtraBold } from '@expo-google-fonts/roboto-slab';

const FontLoader = ({ children }) => {
  let [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_700Bold,
    RobotoSlab_500Medium,
    RobotoSlab_800ExtraBold, // Make sure this font is imported correctly
  });

  return <>{children}</>;
};

export default FontLoader;