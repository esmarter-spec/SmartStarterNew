import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  
  const bubbleCount = 25;
  const bubbles = Array.from({ length: bubbleCount }).map(() => ({
    x: Math.random() * width,
    size: Math.random() * 35 + 15,
    durationY: Math.random() * 4000 + 8000,
    durationX: Math.random() * 4000 + 5000,
    delay: Math.random() * 1000,
  }));

 
  const animY = useRef(bubbles.map(() => new Animated.Value(height + 100))).current;
  const animX = useRef(bubbles.map(() => new Animated.Value(0))).current;

  const buttonShake = useRef(new Animated.Value(0)).current;

 
  useEffect(() => {
    bubbles.forEach((bubble, i) => {
      const animateBubble = () => {
      
        Animated.timing(animY[i], {
          toValue: -150,
          duration: bubble.durationY,
          delay: bubble.delay,
          useNativeDriver: true,
          easing: Easing.linear,
        }).start(() => {
          animY[i].setValue(height + 100);
          animateBubble(); // restart
        });

       
        Animated.loop(
          Animated.sequence([
            Animated.timing(animX[i], {
              toValue: 20,
              duration: bubble.durationX / 2,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(animX[i], {
              toValue: -20,
              duration: bubble.durationX / 2,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
          ])
        ).start();
      };
      animateBubble();
    });

    
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonShake, {
          toValue: 5,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(buttonShake, {
          toValue: -5,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(buttonShake, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/bgg.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      {/* Floating Bubbles */}
      <View style={StyleSheet.absoluteFill}>
        {bubbles.map((bubble, i) => (
          <Animated.View
            key={i}
            style={[
              styles.bubble,
              {
                width: bubble.size,
                height: bubble.size,
                left: bubble.x,
                transform: [
                  { translateY: animY[i] },
                  { translateX: animX[i] },
                ],
              },
            ]}
          />
        ))}
      </View>

      {/* Content */}
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>Where Learning is an Adventure!</Text>
        </View>

        <View style={styles.bottomContent}>
          <Animated.View
            style={{
              transform: [{ translateX: buttonShake }],
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.buttonText}>Let’s get started</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  topContent: {
    alignItems: 'center',
    marginTop: 70, // moved logo a bit lower
  },
  logo: {
    width: 280,
    height: 200,
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 26, // made bigger
    fontWeight: 'bold',
    color: '#0a0202ff',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    textAlign: 'center',
  },
  bottomContent: {
    marginBottom: 150,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#2c30f6ff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.61)',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#fff',
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
});
