import React from 'react';
import { StyleSheet, Text, View , Button , TouchableOpacity} from 'react-native';
import { Camera, Permissions , FaceDetector } from 'expo';

export default class Login extends React.Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
        let photo = await this.camera.takePictureAsync();
        const options = { mode: FaceDetector.Constants.Mode.fast }
        const result = await FaceDetector.detectFacesAsync(photo.uri, options);
        console.log(result);
        if (result.faces.length > 0) {
            this.props.navigation.navigate('AfterLogin');
        }
    }
}

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          ref={ref => this.camera = ref}
          style={{ flex: 1 }} 
          type={this.state.type}>
            <View
              style={{
              flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'flex-end',
            }}>
            <Button
              onPress={this.snap}
              raised
              icon={{ name: 'expand-less', size: 32 }}
              buttonStyle={{ backgroundColor: '#8000FF', borderRadius: 10 }}
              textStyle={{ textAlign: 'center' }}
              title={`Click To detect Face`}
            />
        </View>
      </Camera>
    </View>
    );
  }
}
}

