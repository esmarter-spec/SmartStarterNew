import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Category4Screen({ navigation }) {
  // 🫧 Floating bubble animation setup
  const bubbleCount = 25;
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

  // 💬 Shake animation for the main bubble
  const shakeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 5,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -5,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // 🌊 Floating animation for next/back buttons
  const floatAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 10,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // 🟦 Navigation Handlers
  const handlePress = () => navigation.navigate('Shapes');
  const handleSettingsPress = () => navigation.navigate('Setting');
  const handleBackPress = () => navigation.goBack();
  const handleNextPress = () => navigation.navigate('Category1');

  return (
    <ImageBackground
      source={require('../assets/bg3.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* 🫧 Endless Floating Bubbles */}
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

      {/* 🔙 Back Button (Top Left) */}
      <TouchableOpacity style={styles.backTopButton} onPress={handleBackPress}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      {/* ⚙️ Settings Icon (Top Right) */}
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
        <View style={styles.settingsCircle}>
          <Image
            source={require('../assets/settings.png')}
            style={styles.settingsIcon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      {/* 🎨 Main Container */}
      <View style={styles.container}>
        {/* 💬 Animated Bubble */}
        <Animated.View
          style={[
            styles.bubbleContainer,
            { transform: [{ translateX: shakeAnim }] },
          ]}
        >
          <Image
            source={require('../assets/bubble.png')}
            style={styles.bubbleImage}
            resizeMode="contain"
          />
          <Text style={styles.bubbleText}>6/12{'\n'}Cards</Text>
        </Animated.View>

        {/* 🟩 Shapes Image */}
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
          <Image
            source={require('../assets/shapes.png')}
            style={styles.shapesImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* ◀️▶️ Navigation Buttons */}
      <Animated.View
        style={[
          styles.navigationContainer,
          { transform: [{ translateY: floatAnim }] },
        ]}
      >
        <TouchableOpacity onPress={handleBackPress}>
          <Image
            source={require('../assets/back.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextPress}>
          <Image
            source={require('../assets/next.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  floatingBubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderRadius: 50,
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
    backgroundColor: '#061872ff',
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
  bubbleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 100,
  },
  bubbleImage: {
    width: 400,
    height: 210,
  },
  bubbleText: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  shapesImage: {
    width: 400,
    height: 350,
    marginTop: 60,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 105,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  navIcon: {
    width: 90,
    height: 90,
  },
});
