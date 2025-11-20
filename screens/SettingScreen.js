import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';

export default function SettingScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [volume, setVolume] = useState(0.5);

  // 🌈 Floating Bubbles Setup
  const bubbles = Array.from({ length: 8 }).map(() => ({
    size: Math.random() * 60 + 20,
    y: Math.random() * 700,
  }));

  const animX = useRef(bubbles.map(() => new Animated.Value(0))).current;
  const animY = useRef(bubbles.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // X movement
    animX.forEach((anim) => {
      const moveX = () => {
        Animated.sequence([
          Animated.timing(anim, {
            toValue: Math.random() * 300 - 150,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: Math.random() * 300 - 150,
            duration: 5000,
            useNativeDriver: true,
          }),
        ]).start(moveX);
      };
      moveX();
    });

    // Y movement
    animY.forEach((anim) => {
      const moveY = () => {
        Animated.sequence([
          Animated.timing(anim, {
            toValue: Math.random() * 400 - 200,
            duration: 7000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: Math.random() * 400 - 200,
            duration: 7000,
            useNativeDriver: true,
          }),
        ]).start(moveY);
      };
      moveY();
    });
  }, []);

  return (
    <ImageBackground
      source={require('../assets/bgg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* 🌈 Floating Bubbles */}
      <View style={StyleSheet.absoluteFill}>
        {bubbles.map((bubble, i) => (
          <Animated.View
            key={i}
            style={[
              styles.floatingBubble,
              {
                width: bubble.size,
                height: bubble.size,
                top: bubble.y,
                transform: [
                  { translateX: animX[i] },
                  { translateY: animY[i] },
                ],
              },
            ]}
          />
        ))}
      </View>

      {/* Main Container */}
      <View style={styles.container}>
        {/* Header Image */}
        <Image
          source={require('../assets/kids.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />

        {/* Modal */}
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {/* ❌ Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Category1');
                }}
              >
                <Image
                  source={require('../assets/close.png')}
                  style={styles.closeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* ⚙️ Settings Banner */}
              <Image
                source={require('../assets/settingsA.png')}
                style={styles.settingsABanner}
                resizeMode="contain"
              />

              {/* 🎵 Music Title */}
              <Text style={styles.title}>Music</Text>

              {/* 🎚️ Volume Slider */}
              <Slider
                style={[styles.slider, { transform: [{ scaleY: 2 }] }]}
                minimumValue={0}
                maximumValue={1}
                value={volume}
                minimumTrackTintColor="#003366"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#003366"
                onValueChange={(val) => setVolume(val)}
              />

              {/* 🧭 Menu Buttons */}
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.menuText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigation.navigate('KidsP')}
              >
                <Text style={styles.menuText}>Kids Progress</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigation.navigate('AboutUsA')}
              >
                <Text style={styles.menuText}>About Us</Text>
              </TouchableOpacity>

               <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Login'); // ✅ Navigate to LoginScreen
                }}
              >
                <Text style={styles.menuText}>Log-out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  floatingBubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 999,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 220,
    marginTop: 125,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 270,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
    elevation: 8,
    borderWidth: 10,
    borderColor: '#003366',
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    right: -19,
    zIndex: 10,
  },
  closeIcon: {
    width: 60,
    height: 100,
  },
  settingsABanner: {
    position: 'absolute',
    top: -50,
    alignSelf: 'center',
    width: 200,
    height: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 1,
    color: '#003366',
    marginTop: 0,
  },
  slider: {
    width: '80%',
    height: 40,
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: '#003366',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 6,
    width: '100%',
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
