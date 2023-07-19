import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PdfEditor from 'react-native-pdfeditor';

const PdfList = props => {
  const [checkPdf, setCheckPdf] = useState(false);
  const [url, setUrl] = useState('');

  const pdfData = [
    {name: 'Pdf1', url: 'https://www.africau.edu/images/default/sample.pdf'},
    {
      name: 'Pdf2',

      url: 'https://www.africau.edu/images/default/sample.pdf',
    },
  ];

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {!checkPdf ? (
        <>
          {pdfData.map(item => (
            <Text
              onPress={
                () => {
                  console.log(item.url);
                  setUrl(item.url);
                  setCheckPdf(true);
                }
              }
              style={{
                borderWidth: 2,
                padding: 15,
                borderColor: 'red',
                marginVertical: 5,
              }}>
              {item.name}
            </Text>
          ))}
        </>
      ) : (
        <PdfEditor url={url}
        editable={true}
        editBtn={(url)=>{
          props.navigation.navigate('PdfEditor',{url:url})
        }} 
        onBackPress={()=>{
          setCheckPdf(false)
        }}
        />
      )}
    </View>
  );
};

export default PdfList;

const styles = StyleSheet.create({});
