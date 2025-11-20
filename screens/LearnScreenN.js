import React, { useState, useEffect } from 'react';
import { 
  View, Text, Image, TouchableOpacity, 
  StyleSheet, ImageBackground, Animated, Dimensions 
} from 'react-native';
import * as Speech from 'expo-speech'; // ✅ Import speech

export default function NumbersScreen({ navigation }) {
  const numbers = [
    { id: 1, img: require('../assets/1.png'), label: 'One' },
    { id: 2, img: require('../assets/2.png'), label: 'Two' },
    { id: 3, img: require('../assets/3.png'), label: 'Three' },
    { id: 4, img: require('../assets/4.png'), label: 'Four' },
    { id: 5, img: require('../assets/5.png'), label: 'Five' },
    { id: 6, img: require('../assets/6.png'), label: 'Six' },
    { id: 7, img: require('../assets/7.png'), label: 'Seven' },
    { id: 8, img: require('../assets/8.png'), label: 'Eight' },
    { id: 9, img: require('../assets/9.png'), label: 'Nine' },
    { id: 10, img: require('../assets/10.png'), label: 'Ten' },
    { id: 11, img: require('../assets/11.png'), label: 'Eleven' },
    { id: 12, img: require('../assets/12.png'), label: 'Twelve' },
    { id: 13, img: require('../assets/13.png'), label: 'Thirteen' },
    { id: 14, img: require('../assets/14.png'), label: 'Fourteen' },
    { id: 15, img: require('../assets/15.png'), label: 'Fifteen' },
  ];

  const [index, setIndex] = useState(0);
  const current = numbers[index];

  const handleNext = () => {
    if (index < numbers.length - 1) setIndex(index + 1);
  };

  const handleBack = () => {
    if (index > 0) setIndex(index - 1);
  };

  // ✅ Speech function
  const speakNumber = () => {
    Speech.speak(current.label, {
      language: 'en',
      pitch: 1,
      rate: 0.9,
    });
  };

  const { width, height } = Dimensions.get('window');
  const bubbles = Array.from({ length: 10 }).map(() => new Animated.Value(0));

  useEffect(() => {
    bubbles.forEach((anim) => {
      const loop = () => {
        anim.setValue(0);
        Animated.timing(anim, {
          toValue: 1,
          duration: 10000 + Math.random() * 5000,
          useNativeDriver: true,
        }).start(() => loop());
      };
      loop();
    });
  }, []);

  return (
    <ImageBackground
      source={require('../assets/bg1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* 🫧 Floating Bubbles */}
      {bubbles.map((anim, i) => {
        const translateX = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, width + 50],
        });
        const translateY = Math.random() * height;
        const size = 20 + Math.random() * 40;
        const opacity = 0.3 + Math.random() * 0.5;

        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              top: translateY,
              left: -50,
              transform: [{ translateX }],
              opacity,
            }}
          >
            <View
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
              }}
            />
          </Animated.View>
        );
      })}

      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backTopButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      {/* ⚙️ Settings Button */}
      <TouchableOpacity style={styles.settingsButton}>
        <View style={styles.settingsCircle}>
          <Image
            source={require('../assets/settings.png')}
            style={styles.settingsIcon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      {/* 🔢 Number Card */}
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={current.img} style={styles.image} resizeMode="contain" />
        </View>

        {/* ✅ Sound Button (with Speech) */}
        <TouchableOpacity style={styles.soundContainer} onPress={speakNumber}>
          <Image
            source={require('../assets/soundsA.png')}
            style={styles.soundIcon}
            resizeMode="contain"
          />
          <Text style={styles.label}>{current.label}</Text>
        </TouchableOpacity>
      </View>

      {/* ◀️▶️ Navigation */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={require('../assets/back.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Image
            source={require('../assets/next.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#79b8f7',
  },
  backTopButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#1E2A78',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    zIndex: 10,
  },
  backText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  settingsCircle: {
    backgroundColor: '#0c26acff',
    width: 35,
    height: 35,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  settingsIcon: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  soundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FECFE3',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginTop: 10,
  },
  soundIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  label: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7E37C9',
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 90,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  navIcon: {
    width: 70,
    height: 70,
  },
});
  