import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
const ImageSelector = ({navigation}) => {
  const handleChoosePhoto = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        navigation.navigate('Canvas', {
          photo: response,
        });
      }
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.photo}>
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
      </View>
    </View>
  );
};
export default ImageSelector;
const styles = StyleSheet.create({
  photo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
