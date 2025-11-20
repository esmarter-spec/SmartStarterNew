import React, { useRef, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Animated, Easing, Dimensions 
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Category1Screen({ navigation }) {
  const bubbleCount = 20;
  const bubbles = Array.from({ length: bubbleCount }).map(() => ({
    y: Math.random() * height,
    size: Math.random() * 40 + 20,
    durationX: Math.random() * 8000 + 6000,
    delay: Math.random() * 4000,
  }));

  const animX = useRef(bubbles.map(() => new Animated.Value(-100))).current;

  useEffect(() => {
    bubbles.forEach((bubble, i) => {
      const animateBubble = () => {
        animX[i].setValue(-100);
        Animated.timing(animX[i], {
          toValue: width + 100,
          duration: bubbles[i].durationX,
          delay: bubbles[i].delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => animateBubble());
      };
      animateBubble();
    });
  }, []);

  // 🔄 Shake animation for bubble
  const shakeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 5, duration: 200, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -5, duration: 200, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 200, easing: Easing.linear, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // 🟦 “Next” button animation (bouncing)
  const nextAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(nextAnim, { toValue: -10, duration: 500, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(nextAnim, { toValue: 0, duration: 500, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const abcScale = useRef(new Animated.Value(1)).current;
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(abcScale, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(abcScale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      navigation.navigate('Alphabets');
    });
  };

  const handleSettingsPress = () => navigation.navigate('Setting');
  const handleBackPress = () => navigation.navigate('Login');
  const handleNextPress = () => navigation.navigate('Category2');

  return (
    <ImageBackground
      source={require('../assets/bgg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* 🌈 Floating background bubbles */}
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
                transform: [{ translateX: animX[i] }],
              },
            ]}
          />
        ))}
      </View>

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
        {/* 🫧 Bubble Image with Shaking Effect */}
        <Animated.View
          style={[
            styles.bubbleContainer,
            { transform: [{ translateX: shakeAnim }, { translateY: 10 }] },
          ]}
        >
          <Image
            source={require('../assets/bubble.png')}
            style={styles.bubbleImage}
            resizeMode="contain"
          />
          <Text style={styles.bubbleText}>10/26{'\n'}Cards</Text>
        </Animated.View>

        {/* 👶 ABC Image with Bounce Click */}
        <Animated.View style={{ transform: [{ scale: abcScale }] }}>
          <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
            <Image
              source={require('../assets/abc.png')}
              style={styles.abcImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* ▶️ Next Navigation Button */}
      <View style={styles.navigationContainer}>
        <Animated.View style={{ transform: [{ translateY: nextAnim }] }}>
          <TouchableOpacity onPress={handleNextPress}>
            <Image
              source={require('../assets/next.png')}
              style={styles.navIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  floatingBubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderRadius: 50,
  },
  settingsButton: { position: 'absolute', top: 40, right: 25 },
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
  settingsIcon: { width: 30, height: 35, tintColor: 'white' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  bubbleContainer: { alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 120 },
  bubbleImage: { width: 400, height: 230 },
  bubbleText: { position: 'absolute', fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center' },
  abcImage: { width: 300, height: 260, marginTop: 50 },
  navigationContainer: {
    position: 'absolute',
    bottom: 105,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
  navIcon: { width: 90, height: 90 },
});
