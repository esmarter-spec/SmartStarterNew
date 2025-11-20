import React, { useEffect, useRef } from 'react';
import {View,StyleSheet,Image,ImageBackground,TouchableOpacity,Text,Animated,Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Alphabets({ navigation }) {
  const bubbles = Array.from({ length: 12 }); // number of bubbles
  const animations = useRef(bubbles.map(() => new Animated.Value(0))).current;

  // Floating animation logic
  useEffect(() => {
    animations.forEach((anim, index) => {
      const loopAnimation = () => {
        anim.setValue(0);
        Animated.timing(anim, {
          toValue: 1,
          duration: 8000 + Math.random() * 4000, // varied speed
          useNativeDriver: true,
        }).start(() => loopAnimation());
      };
      loopAnimation();
    });
  }, []);

  const handleLearnPress = () => {
    navigation.navigate('Learn');
  };

  const handlePlayPress = () => {
    navigation.navigate('PlayA');
  };

  const handleSettingsPress = () => {
    // Settings logic
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../assets/bgg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* 🫧 Endless Floating Bubbles */}
      {bubbles.map((_, i) => {
        const translateY = animations[i].interpolate({
          inputRange: [0, 1],
          outputRange: [height + 50, -50],
        });

        const translateX = animations[i].interpolate({
          inputRange: [0, 1],
          outputRange: [Math.random() * width, Math.random() * width],
        });

        const bubbleSize = 40 + Math.random() * 40;

        return (
          <Animated.Image
            key={i}
            source={require('../assets/bubble.png')}
            style={[
              styles.bubble,
              {
                width: bubbleSize,
                height: bubbleSize,
                opacity: 0.7,
                transform: [{ translateY }, { translateX }],
              },
            ]}
            resizeMode="contain"
          />
        );
      })}

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
        {/* 🧒 Alphabets Banner */}
        <Image
          source={require('../assets/alphabets.png')}
          style={styles.bannerImage}
          resizeMode="contain"
        />

        {/* 📘 Learn Button */}
        <TouchableOpacity
          onPress={handleLearnPress}
          activeOpacity={0.8}
          style={styles.optionContainer}
        >
          <View style={styles.optionBox}>
            <Image
              source={require('../assets/learn.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        {/* 🎮 Play Button */}
        <TouchableOpacity
          onPress={handlePlayPress}
          activeOpacity={0.8}
          style={styles.optionContainer}
        >
          <View style={styles.optionBox}>
            <Image
              source={require('../assets/play.png')}
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
    width: 350,
    height: 230,
    marginBottom: 10,
  },
  optionContainer: {
    marginVertical: 8,
    alignItems: 'center',
  },
  optionBox: {
    width: 350,
    height: 120,
  },
  optionImage: {
    width: '100%',
    height: '115%',
  },
});
