import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput,  
KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Button } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [profile, setProfile] = React.useState({email: '', password:''});
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!")
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    //console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({localUri: pickerResult.uri});
    
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`the image is available for sharing at ${selectedImage.remoteUri}`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri).catch((err)=>console.log(err));
  };

  let clearImage = () => {
    setSelectedImage(null);
    setProfile({email: '', password:''})
  }

  let handleSubmit = (e) => {
    console.log(profile);
  }

  

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
        source={{uri: selectedImage.localUri}}
        style={styles.thumbnail}
        />
        <TouchableOpacity 
        onPress={openShareDialogAsync}
        style={styles.button}
        >
          <Text style={styles.buttonText}>
            Share this photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={clearImage}
        style={styles.button}
        >
          <Text style={styles.buttonText}>
            Clear Image
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.instructions}>
          To share a photo from your phone with a friend, just press the button below!
        </Text>
        <TouchableOpacity
          onPress={openImagePickerAsync}
          style={styles.button}>
            <Text style={styles.buttonText}>
              Pick a photo
            </Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
    alignSelf: 'center',
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  button: {
    width: 200,
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: 'center',
  },
});
