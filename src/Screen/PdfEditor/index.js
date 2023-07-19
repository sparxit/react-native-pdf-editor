import { Config, DocumentView, RNPdftron } from '@pdftron/react-native-pdf';
import React, { Component } from 'react';
import { Platform } from 'react-native';
var RNFS = require('react-native-fs');


var saveDirectory = '';

export default class PdfEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: this.props.route.params.url,
    };

    _viewer = React.createRef();

    RNPdftron.initialize('Insert commercial license key here after purchase');
    RNPdftron.enableJavaScript(true);
  }

  onLeadingNavButtonPressed = () => {
    console.log('leading nav button pressed');
    this.props.navigation.goBack();
  };

  savePdfFile = () => {
    if (Platform.OS == 'android') this.savePdfFileAndroid();
    else this.savePdfFileIOS();
  };

  savePdfFileIOS = () => {
    console.log('inside iOS method');
    console.log('file directory is:-- ', this.props.route.params.url);
    _viewer.current.saveDocument().then(filePath => {
      console.log('filePath:', filePath);

      let file = filePath.split('/');
      let fileName = file[file.length - 1];
      let tempFile = fileName.slice(0, fileName.length - 4);
      let tempfileArray = tempFile.split(' ');
      let fileCount = 1;
      console.log('file tempfileArray is:-- ', tempfileArray);
      if (tempfileArray.length > 0) {
        fileCount = parseInt(tempfileArray[1]) + 1;
        console.log('file count is:-- ', fileCount);
        console.log('file count is:-- ', fileCount);
        fileName = tempfileArray[0] + ' ' + fileCount + '.pdf';
      }

      saveDirectory = RNFS.CachesDirectoryPath + '/' + fileName;

      RNFS.copyFile(filePath, saveDirectory)
        .then(() => {
          this.setState({filePath: saveDirectory});
        })
        .catch(err => {
          console.log('@@@@ ', err);
        });



      if (RNFS.exists(saveDirectory)) {
        var path = RNFS.CachesDirectoryPath + '/' + file[file.length - 1];

        RNFS.unlink(path)
          .then(() => {
            console.log('FILE DELETED');
          })
          // `unlink` will throw an error, if the item to unlink does not exist
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log('saveDirectory:22 ', saveDirectory);

        RNFS.copyFile(filePath, saveDirectory);
      }

      alert('Pdf saved');
    });
  };

  savePdfFileAndroid = () => {
    console.log('inside android method');
    _viewer.current.saveDocument().then(filePath => {
      console.log('filePath:', filePath);
   

      saveDirectory = RNFS.CachesDirectoryPath;


      console.log('saveDirectory:', saveDirectory);
      
      RNFS.copyFile(filePath, saveDirectory);

      alert('Pdf saved');
    });
  };

  render() {
    const path = this.props.route.params.url;

    return (
      <DocumentView
        ref={_viewer}
        exportPath={saveDirectory}
        autoSaveEnabled={false}
        hideAnnotationToolbarSwitcher={false}
        hideTopToolbars={false}
        hideTopAppNavBar={false}
        document={path}
        onLoadComplete={path => {
          console.log('The document has finished loading:', path);
        }}
        padStatusBar={true}
        showLeadingNavButton={true}
        leadingNavButtonIcon={
          Platform.OS === 'ios' ? 'backicon.png' : 'ic_arrow_back_white_24dp'
        }
        readOnly={false}
        disabledElements={[
          Config.Buttons.userBookmarkListButton,
          Config.Buttons.shareButton,
          Config.Buttons.addPageButton,
          Config.Buttons.insertPageButton,
          Config.Buttons.viewControlsButton,
        ]}
        disabledTools={[
          Config.Tools.annotationCreateLine,
          Config.Tools.annotationCreateRectangle,
          Config.Tools.insertPage,
        ]}
        fitMode={Config.FitMode.FitPage}
        layoutMode={Config.LayoutMode.Continuous}
        openOutlineList={true}
        topAppNavBarRightBar={
          Platform.OS == 'android'
            ? [Config.Buttons.saveCopyButton]
            : [Config.Buttons.shareButton]
        }
        overrideToolbarButtonBehavior={
          Platform.OS == 'android'
            ? [Config.Buttons.saveCopyButton]
            : [Config.Buttons.shareButton]
        }
        onToolbarButtonPress={({id}) => {
          console.log('button id is:-- ', id);
          if (
            id === Config.Buttons.shareButton ||
            id === Config.Buttons.saveCopyButton
          ) {
            console.log('Share button pressed');
            this.savePdfFile();
            // this.checkPermission();
          }
        }}
        onLeadingNavButtonPressed={this.onLeadingNavButtonPressed}
      />
    );
  }
}
