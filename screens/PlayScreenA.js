import React, { useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, Text, Animated } from 'react-native';

export default function PlayA({ navigation }) {
  // 🌟 Mapping ng letter strings sa images
  const letterImages = {
    Cc: require('../assets/Cc.png'),
    Dd: require('../assets/Dd.png'),
    Vv: require('../assets/Vv.png'),
    Uu: require('../assets/Uu.png'),
    Ii: require('../assets/Ii.png'),
    Bb: require('../assets/Bb.png'),
    Zz: require('../assets/Zz.png'),
    Mm: require('../assets/Mm.png'),
  };

  const [message, setMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  // 🌟 Current correct letter
  const correctLetter = 'Bb'; // puwede mong palitan o gawing dynamic sa future

  const handleLetterPress = (letter) => {
    if (letter === correctLetter) {
      showMessage('🎉 Correct! 🎉');
    } else {
      showMessage('❌ Try Again! ❌');
    }
  };

  const showMessage = (text) => {
    setMessage(text);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }, 1000);
    });
  };

  // 🌟 Letters positions (flexible, based sa iyong existing layout)
  const lettersLayout = [
    { letter: 'Cc', top: 100, left: 40 },
    { letter: 'Dd', top: 100, right: 3 },
    { letter: 'Vv', top: 150, left: 130 },
    { letter: 'Uu', top: 280, left: 4 },
    { letter: 'Ii', top: 270, right: 45 },
    { letter: 'Bb', top: 380, left: 130 },
    { letter: 'Zz', bottom: 160, left: 40 },
    { letter: 'Mm', bottom: 150, right: 40 },
  ];

  return (
    <ImageBackground
      source={require('../assets/bgplay.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backTopButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      {/* ⚙️ Settings Button */}
      <TouchableOpacity style={styles.settingsButton}>
        <Image
          source={require('../assets/settings.png')}
          style={styles.settingsIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* 🔤 Letters */}
      <View style={styles.lettersContainer}>
        {lettersLayout.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.letterBubble, { top: item.top, left: item.left, right: item.right, bottom: item.bottom }]}
            onPress={() => handleLetterPress(item.letter)}
          >
            <Image
              source={letterImages[item.letter]}
              style={styles.letterImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* ✅ Feedback Message */}
      {message !== '' && (
        <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
          <Text style={styles.messageText}>{message}</Text>
        </Animated.View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  backTopButton: { position: 'absolute', top: 40, left: 20, backgroundColor: '#1E2A78', paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20, zIndex: 10 },
  backText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  settingsButton: { position: 'absolute', top: 40, right: 20 },
  settingsIcon: { width: 40, height: 40 },
  lettersContainer: { flex: 1 },
  letterBubble: { position: 'absolute' },
  letterImage: { width: 140, height: 140 },

  messageContainer: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },
  messageText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF4500',
    textAlign: 'center',
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});
