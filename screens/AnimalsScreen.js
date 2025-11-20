import React, { useEffect, useRef } from 'react';
import {View,StyleSheet,Image,ImageBackground,TouchableOpacity,Text,Animated,Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const NUM_BUBBLES = 15; // number of bubbles shown at a time

export default function Animals({ navigation }) {
  const bubbles = useRef(
    [...Array(NUM_BUBBLES)].map(() => ({
      x: new Animated.Value(Math.random() * width),
      y: Math.random() * height,
      size: 30 + Math.random() * 40,
      speed: 3000 + Math.random() * 5000,
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
        }).start(() => animateBubble()); // loop endlessly
      };
      animateBubble();
    });
  }, []);

  const handleLearnPress = () => {
    navigation.navigate('AnimalsScreen');
  };

  const handlePlayPress = () => {
    navigation.navigate('PlayAn');
  };

  const handleSettingsPress = () => {
    // Settings logic here
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../assets/bg2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Endless Bubbles */}
      {bubbles.map((bubble, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bubble,
            {
              width: bubble.size,
              height: bubble.size,
              borderRadius: bubble.size / 2,
              transform: [
                { translateX: bubble.x },
                { translateY: bubble.y },
              ],
            },
          ]}
        />
      ))}

      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backTopButton} onPress={handleBackPress}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      {/* ⚙️ Settings Icon */}
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
        <View style={styles.settingsCircle}>
          <Image
            source={require('../assets/settings.png')}
            style={styles.settingsIcon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      <View style={styles.container}>
        {/* 🧸 Animals Banner */}
        <Image
          source={require('../assets/animals1.png')}
          style={styles.bannerImage}
          resizeMode="contain"
        />

        {/* 📘 Learn Button */}
        <TouchableOpacity onPress={handleLearnPress} activeOpacity={0.8} style={styles.optionContainer}>
          <View style={styles.optionBox}>
            <Image
              source={require('../assets/learnA.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        {/* 🎮 Play Button */}
        <TouchableOpacity onPress={handlePlayPress} activeOpacity={0.8} style={styles.optionContainer}>
          <View style={styles.optionBox}>
            <Image
              source={require('../assets/playA.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
          </View>
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
    overflow: 'hidden',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
  bannerImage: {
    width: 300,
    height: 230,
    marginBottom: 10,
  },
  optionContainer: {
    marginVertical: 8,
    alignItems: 'center',
  },
  optionBox: {
    width: 330,
    height: 120,
  },
  optionImage: {
    width: '105%',
    height: '110%',
  },
});
