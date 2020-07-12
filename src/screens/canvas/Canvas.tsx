import CameraRoll from '@react-native-community/cameraroll';
import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob';
import doodle from './doodle';
import {timeStamp} from './timestamp';

const Canvas = ({route, navigation}) => {
  const saveImage = async (imageURI: string) => {
    var Base64Code = imageURI.split('data:image/png;base64,');
    const dirs = RNFetchBlob.fs.dirs;
    var path = dirs.PictureDir + `/${timeStamp()}.png`;
    await RNFetchBlob.fs
      .writeFile(path, Base64Code[1], 'base64')
      .then((res) => {
        console.log('File : ', res);
      });
    CameraRoll.save(path);
    Alert.alert('File saved');
  };
  return (
    <View style={styles.safeArea}>
      <WebView
        style={styles.webview}
        originWhitelist={['*']}
        scrollEnabled={false}
        source={{html: doodle(route.params.photo)}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={false}
        automaticallyAdjustContentInsets={false}
        onMessage={(event) => {
          // console.log(event.nativeEvent.data);
          saveImage(event.nativeEvent.data);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  webview: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 1,
  },
  image: {
    height: '90%',
    width: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  safeArea: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    right: 0,
  },
});

export default Canvas;
