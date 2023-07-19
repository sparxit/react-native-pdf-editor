import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';

import PdfEditor from '../Screen/PdfEditor';
import PdfViewer from '../Components/PdfView';
import PdfList from '../Components/PdfList';
// root stack
const RootStack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <RootStack.Navigator
      initialRouteName={'Pdf'}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <RootStack.Screen name="Pdf" component={PdfList} />

      <RootStack.Screen name="PdfEditor" component={PdfEditor} />

      <RootStack.Screen name="PdfViewer" component={PdfViewer} />
    </RootStack.Navigator>
  );
};

export default MainStack;
