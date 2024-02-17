import { StyleSheet, Text, View} from "react-native";
import IntroScreen from "./IntroScreen";
import FontLoader from './Data/FontLoader';

export default function Page() {
  return (
    <>
       <FontLoader>
          <View style={styles.container}>
            <IntroScreen></IntroScreen>
          </View> 
      </FontLoader>
    </>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
