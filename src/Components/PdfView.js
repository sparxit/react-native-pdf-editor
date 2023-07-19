// import React, {useEffect, useState} from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import Pdf from 'react-native-pdf';
// import {useFocusEffect} from '@react-navigation/native';
// import Colors from '../../Utils/Colors';
// import {backicon, editIcon} from '../../Utils/Icon';

// var RNFS = require('react-native-fs');

// const PdfEditor = props => {
//   const [filePath, setFilePath] = useState('');
//   const [source, setSource] = useState({
//     uri: '',
//     cache: true,
//   });

//   useEffect(() => {}, [source]);

//   useFocusEffect(
//     React.useCallback(() => {
//       init();
//     }, []),
//   );

//   const init = () => {
//     let tempJson = source;
//     console.log('file data is:-===--', source);
//     tempJson.uri = '';
//     setSource(tempJson);
//     setFilePath('');
//     console.log('inside pdf screen', filePath);
//     console.log('pdf url is:--- ', props.route.params.url);
//     let fileArray = props.route.params.url.split('?');
//     console.log('pdf url is:-===-- ', fileArray);
//     let file = fileArray[0].split('/');
//     let fileName = file[file.length - 1];

//     console.log('pdf url is:-===-- ', fileName);
//     RNFS.readDir(RNFS.CachesDirectoryPath).then(data => {
//       console.log('data is===', data);
//       if (data.length > 0) {
//         console.log('data is===data.length > 0');
//         checkFileExist(fileName, data);
//       } else {
//         let tempJson = source;
//         console.log('file data is:-===--', source);
//         tempJson.uri = props.route.params.url;
//         setSource(tempJson);
//         setFilePath(props.route.params.url);
//         console.log('file data is:-===--', source);
//       }
//     });
//   };

//   const checkFileExist = (fileName, data) => {
//     console.log('inside filter');

//     let tempFileName = fileName.slice(0, fileName.length - 4);

//     console.log('file tempFileName is:---', tempFileName);
//     let tempCheckFileName = tempFileName.split(' ');
//     if (tempCheckFileName.length > 0) tempFileName = tempCheckFileName[0];

//     let fileData = data.filter(item => {
//       return item.name.includes(tempFileName);
//     });

//     console.log('file data is:---', fileData);
//     let tempJson = source;
//     console.log('file data is:---', tempJson);
//     if (fileData.length > 0) {
//       console.log('file data is:--fileData.length > 0');
//       props.route.params.url = fileData[0].path;
//       tempJson.uri = fileData[0].path;
//       setSource(tempJson);
//       setFilePath(fileData[0].path);
//       console.log('file data is:--fileData.length > 0', tempJson);
//       console.log('file data is:--fileData.length > 0', source);
//     } else {
//       console.log('file data is:--fileData.length < 0');
//       tempJson.uri = props.route.params.url;
//       setSource(tempJson);
//       setFilePath(props.route.params.url);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View
//         style={{
//           height: 60,
//           flexDirection: 'row',
//           marginHorizontal: 10,
//           alignItems: 'center',
//           width: '100%',
//           // backgroundColor: Colors.darkBlue,
//         }}>
//         <TouchableOpacity onPress={()=>{
//           props.navigation.goBack()
//         }}>
//           <Image style={{marginLeft: 20}} source={backicon} />
//         </TouchableOpacity>

//         <Text style={{marginHorizontal: 15, fontSize: 18, fontWeight: '600'}}>
//           Pdf Editor
//         </Text>

//         <View style={{flex: 1, alignItems: 'flex-end', marginRight: 20}}>
//           <TouchableOpacity  onPress={()=>{
//           props.navigation.navigate('Home',{url:props.route.params.url})
//         }}>
//             <Image
//               style={{width: 25, height: 25}}
//               resizeMode="contain"
//               source={editIcon}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//       {source.uri.length > 0 ? (
//         <Pdf
//           trustAllCerts={false}
//           source={source}
//           onLoadComplete={(numberOfPages, filePath) => {
//             console.log(`number of pages: ${numberOfPages}`);
//           }}
//           onPageChanged={(page, numberOfPages) => {
//             console.log(`current page: ${page}`);
//           }}
//           onError={error => {
//             console.log('pdf error is:-', error);
//             if (filePath.length > 0) {
//               Alert.alert(
//                 'Error!',
//                 'Invalid pdf url' + error,
//                 [
//                   {
//                     text: 'Ok',
//                     onPress: () => {
//                       console.log('Yes button clicked');
//                       props.navigation.goBack(null);
//                     },
//                   },
//                 ],
//                 {
//                   cancelable: true,
//                 },
//               );
//             }
//           }}
//           onPressLink={uri => {
//             console.log(`Link presse: ${uri}`);
//           }}
//           style={styles.pdf}
//         />
//       ) : (
//         <View>
//           <ActivityIndicator color={Colors.red} size={'large'} />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default PdfEditor;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     //     marginTop: 25,
//   },
//   pdf: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Pdf from 'react-native-pdf';
import {useFocusEffect} from '@react-navigation/native';
import Colors from '../Utils/Colors';
import {backicon, editIcon} from '../Utils/Icon';

var RNFS = require('react-native-fs');

const PdfViewer = props => {
  const [filePath, setFilePath] = useState('');
  const [source, setSource] = useState({
    uri: '',
    cache: true,
  });
  const{url,editable,editBtn,onBackPress}=props;
  useEffect(() => {}, [source]);

  useFocusEffect(
    React.useCallback(() => {
      init();
    }, []),
  );

  const init = () => {
    let tempJson = source;
    console.log('file data is:-===--', source);
    tempJson.uri = '';
    setSource(tempJson);
    setFilePath('');
    console.log('inside pdf screen', filePath);
    let fileArray = url.split('?');
    console.log('pdf url is:-===-- ', fileArray);
    let file = fileArray[0].split('/');
    let fileName = file[file.length - 1];

    console.log('pdf url is:-===-- ', fileName);
    RNFS.readDir(RNFS.CachesDirectoryPath).then(data => {
      console.log('data is===', data);
      if (data.length > 0) {
        console.log('data is===data.length > 0');
        checkFileExist(fileName, data);
      } else {
        let tempJson = source;
        console.log('file data is:-===--', source);
        tempJson.uri = url;
        setSource(tempJson);
        setFilePath(url);
        console.log('file data is:-===--', source);
      }
    });
  };

  const checkFileExist = async(fileName, data) => {
    console.log('inside filter');

    let tempFileName = fileName.slice(0, fileName.length - 4);

    console.log('file tempFileName is:---', tempFileName);
    let tempCheckFileName = tempFileName.split(' ');
    if (tempCheckFileName.length > 0) tempFileName = tempCheckFileName[0];

    let fileData = data.filter(item => {
      return item.name.includes(tempFileName);
    });

    // console.log('file data is:---', fileData);
    let tempJson = source;
    if (fileData.length > 0) {

    // url = fileData[0].path;

      tempJson.uri = fileData[0].path;

     await setSource(tempJson);
      setFilePath(fileData[0].path);
      console.log('file data is:--fileData.length > 0', source);
    } else {
      tempJson.uri = url;
      setSource(tempJson);
      setFilePath(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          marginHorizontal: 10,
          alignItems: 'center',
          width: '100%',
          // backgroundColor: Colors.darkBlue,
        }}>
        <TouchableOpacity onPress={onBackPress}>
          <Image style={{marginLeft: 20}} source={backicon} />
        </TouchableOpacity>

        <Text style={{marginHorizontal: 15, fontSize: 18, fontWeight: '600'}}>
          Pdf Editor
        </Text>

        <View style={{flex: 1, alignItems: 'flex-end', marginRight: 20}}>
        {editable && <TouchableOpacity  onPress={()=>editBtn(source.uri)}>
            <Image
              style={{width: 25, height: 25}}
              resizeMode="contain"
              source={editIcon}
            />
          </TouchableOpacity>}
        </View>
      </View>
      {source.uri != '' ? (
        <Pdf
          trustAllCerts={false}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log('pdf error is:-', error);
            if (filePath.length > 0) {
              Alert.alert(
                'Error!',
                'Invalid pdf url' + error,
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                      console.log('Yes button clicked');
                      props.navigation.goBack(null);
                    },
                  },
                ],
                {
                  cancelable: true,
                },
              );
            }
          }}
          onPressLink={uri => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
      ) : (
        <View>
          <ActivityIndicator color={Colors.red} size={'large'} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PdfViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    //     marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
