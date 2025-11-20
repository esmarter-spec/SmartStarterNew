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
import * as Speech from 'expo-speech';

const { width, height } = Dimensions.get('window');
const NUM_BUBBLES = 15;

export default function Learn({ navigation }) {
  const alphabets = [
    { letter: 'A', image: require('../assets/A.png') },
    { letter: 'B', image: require('../assets/B.png') },
    { letter: 'C', image: require('../assets/C.png') },
    { letter: 'D', image: require('../assets/D.png') },
    { letter: 'E', image: require('../assets/E.png') },
    { letter: 'F', image: require('../assets/F.png') },
    { letter: 'G', image: require('../assets/G.png') },
    { letter: 'H', image: require('../assets/H.png') },
    { letter: 'I', image: require('../assets/I.png') },
    { letter: 'J', image: require('../assets/J.png') },
  ];

  const [index, setIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const current = alphabets[index];

  // Floating bubbles animation
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

  // Navigation
  const handleNext = () => {
    if (index < alphabets.length - 1) setIndex(index + 1);
  };
  const handleBack = () => {
    if (index > 0) setIndex(index - 1);
  };

  // ✅ Play letter sound using expo-speech
  const playLetterSound = async (letter) => {
    if (isSpeaking) return; // prevent overlapping speech

    setIsSpeaking(true);

    try {
      await Speech.stop(); // stop any ongoing speech
      Speech.speak(letter, {
        pitch: 1.0,
        rate: 0.8,
        language: 'en-US',
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch (error) {
      console.error('Speech error:', error);
      setIsSpeaking(false);
    }
  };

  const handleSettingsPress = () => {
    navigation.navigate('Setting');
  };

  return (
    <ImageBackground
      source={require('../assets/bgg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Floating bubbles */}
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

      {/* Back Button */}
      <TouchableOpacity style={styles.backTopButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      {/* Settings Button */}
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
        <View style={styles.settingsCircle}>
          <Image
            source={require('../assets/settings.png')}
            style={styles.settingsIcon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      {/* Alphabet Card */}
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={current.image} style={styles.letterImage} resizeMode="contain" />
        </View>

        {/* Sound Button */}
        <TouchableOpacity
          style={[
            styles.soundContainer,
            isSpeaking ? { backgroundColor: '#FFD700' } : {},
          ]}
          onPress={() => playLetterSound(current.letter)}
        >
          <Image
            source={require('../assets/soundsA.png')}
            style={styles.soundIcon}
            resizeMode="contain"
          />
          <Text style={styles.letterText}>{current.letter + current.letter.toLowerCase()}</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Buttons */}
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
  bubble: { position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.4)' },
  backTopButton: { position: 'absolute', top: 40, left: 20, backgroundColor: '#1E2A78', paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20, zIndex: 10 },
  backText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  settingsButton: { position: 'absolute', top: 40, right: 20, zIndex: 10 },
  settingsCircle: { backgroundColor: '#0c26acff', width: 40, height: 40, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  settingsIcon: { width: 25, height: 25 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { marginBottom: 15, alignItems: 'center' },
  letterImage: { width: 300, height: 350 },
  soundContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FECFE3', paddingVertical: 5, paddingHorizontal: 35, borderRadius: 25, marginTop: 5 },
  soundIcon: { width: 50, height: 50, marginRight: 20 },
  letterText: { fontSize: 32, fontWeight: 'bold', color: '#7E37C9' },
  navigationContainer: { position: 'absolute', bottom: 100, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30 },
  navIcon: { width: 90, height: 90 },
});
