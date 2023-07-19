For edit the pdf ,user need to navigate other screen and user need navigation dependency as well 
````
 npm install @react-navigation/native
````
 React Navigation is made up of some core utilities and those are then used by navigators to create the navigation structure in your app. Don't worry too much about this for now, it'll become clear soon enough! To frontload the installation work, let's also install and configure dependencies used by most navigators, then we can move forward with starting to write some code.

The libraries we will install now are react-native-screens and react-native-safe-area-context.

````
npm install react-native-screens react-native-safe-area-context

````

Installing the native stack navigator library
The libraries we've installed so far are the building blocks and shared foundations for navigators, and each navigator in React Navigation lives in its own library. To use the native stack navigator, we need to install @react-navigation/native-stack :
````
npm install @react-navigation/native-stack
````
💡 @react-navigation/native-stack depends on react-native-screens and the other libraries that we installed . 
