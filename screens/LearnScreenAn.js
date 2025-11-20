import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import * as Speech from 'expo-speech'; // 🟢 Import expo-speech

const { width, height } = Dimensions.get('window');
const NUM_BUBBLES = 15;

export default function Category3animals({ navigation }) {
  const animals = [
    { name: 'Zebra', image: require('../assets/zebra.png') },
    { name: 'Elephant', image: require('../assets/elephant.png') },
    { name: 'Giraffe', image: require('../assets/giraffe.png') },
    { name: 'Fox', image: require('../assets/fox.png') },
    { name: 'Cat', image: require('../assets/cat.png') },
    { name: 'Tiger', image: require('../assets/tiger.png') },
    { name: 'Pig', image: require('../assets/pig.png') },
    { name: 'Bear', image: require('../assets/bear.png') },
    { name: 'Monkey', image: require('../assets/monkey.png') },
    { name: 'Lion', image: require('../assets/lion.png') },
    { name: 'Chicken', image: require('../assets/chicken.png') },
    { name: 'Turtle', image: require('../assets/turtle.png') },
    { name: 'Fish', image: require('../assets/fish.png') },
    { name: 'Dog', image: require('../assets/dog.png') },
    { name: 'Frog', image: require('../assets/frog.png') },
  ];

  const [index, setIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const current = animals[index];

  // 🫧 Floating bubbles animation
  const bubbles = useRef(
    [...Array(NUM_BUBBLES)].map(() => ({
      x: new Animated.Value(Math.random() * width),
      y: Math.random() * height,
      size: 20 + Math.random() * 40,
      speed: 4000 + Math.random() * 5000,
    }))
  ).current;

  useEffect(() => {
    bubbles.forEach((bubble) => {
      const animateBubble = () => {
        bubble.x.setValue(-bubble.size);
        Animated.timing(bubble.x, {
          toValue: width + bubble.size,
          duration: bubble.speed,
          useNativeDriver: true,
        }).start(() => animateBubble());
      };
      animateBubble();
    });
  }, []);

  // 🔹 Navigation handlers
  const handleNext = () => {
    if (index < animals.length - 1) setIndex(index + 1);
  };

  const handleBack = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleTopBack = () => {
    if (navigation && navigation.goBack) navigation.goBack();
  };

  const handleSettingsPress = () => {
    console.log('Settings pressed');
  };

  // 🔊 Play sound using expo-speech
  const handleSoundPress = () => {
    if (isSpeaking) return; // avoid overlapping
    setIsSpeaking(true);

    // 📢 Let it speak the current animal name
    Speech.speak(current.name, {
      pitch: 1.0,
      rate: 0.75,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  return (
    <ImageBackground
      source={require('../assets/bg3.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* 🫧 Floating Bubbles */}
      {bubbles.map((bubble, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bubble,
            {
              width: bubble.size,
              height: bubble.size,
              borderRadius: bubble.size / 2,
              transform: [{ translateX: bubble.x }, { translateY: bubble.y }],
            },
          ]}
        />
      ))}

      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backTopButton} onPress={handleTopBack}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      {/* ⚙️ Settings */}
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
        <View style={styles.settingsCircle}>
          <Image
            source={require('../assets/settings.png')}
            style={styles.settingsIcon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      {/* 🐾 Animal Display */}
      <View style={styles.container}>
        <Image source={current.image} style={styles.animalImage} resizeMode="contain" />

        {/* 🔊 Sound Button */}
        <TouchableOpacity
          style={[styles.soundButton, isSpeaking && { backgroundColor: '#FFD700' }]}
          onPress={handleSoundPress}
        >
          <Image
            source={require('../assets/soundsA.png')}
            style={styles.soundIcon}
            resizeMode="contain"
          />
          <Text style={styles.soundText}>{current.name}</Text>
        </TouchableOpacity>
      </View>

      {/* ⬅️➡️ Navigation Arrows */}
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
  background: { flex: 1, overflow: 'hidden' },
  bubble: { position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.35)' },
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
  backText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  settingsButton: { position: 'absolute', top: 40, right: 20, zIndex: 10 },
  settingsCircle: {
    backgroundColor: '#0C26AC',
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: { width: 25, height: 25 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  animalImage: { width: 300, height: 300, top: -60 },
  soundButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC7E4',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 15,
    marginTop: -50,
  },
  soundIcon: { width: 40, height: 40, marginRight: 10 },
  soundText: { fontSize: 24, fontWeight: 'bold', color: '#7E37C9' },
  navigationContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  navIcon: { width: 90, height: 90 },
});
