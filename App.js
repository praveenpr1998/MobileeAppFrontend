import 'react-native-gesture-handler';
import React, { useState } from 'react';
import SwitchNav from "./navigation/switchNavigator.js";



const App = () => {
  

    return (
      <SwitchNav />
    );
  
};


export default App;
// export default function App() {
  
// const [fontsLoaded, setFontsLoaded] = useState(false);
  
//   // if (fontsLoaded) {
//   //   return (
//   //     <SwicthNav />
//   //   );
//   // } else {
//   //   return (
//   //     <AppLoading 
//   //       startAsync={getFonts} 
//   //       onFinish={() => setFontsLoaded(true)} 
//   //     />
//   //   )
//   // }

// }

