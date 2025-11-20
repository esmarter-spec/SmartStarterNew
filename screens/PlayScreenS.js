import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const NUM_BUBBLES = 15;

export default function PlayScreenS({ navigation }) {
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

  const handleShapePress = (shape) => {
    console.log(`${shape} pressed`);
  };

  const handleSettingsPress = () => {
    console.log('Settings button pressed');
  };

  return (
    <ImageBackground
      source={require('../assets/findshape.png')} // 🖼️ change to your background image
      style={styles.background}
      resizeMode="cover"
    >
      {/* 🫧 Floating bubbles */}
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
      <TouchableOpacity style={styles.backTopButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      {/* ⚙️ Settings Button */}
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
        <View style={styles.settingsCircle}>
          <Image
            source={require('../assets/settings.png')}
            style={styles.settingsIcon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      {/* 🔶 Shape Grid */}
      <View style={styles.shapeContainer}>
        {/* Top row: Oval and Circle */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleShapePress('Oval')}>
            <Image source={require('../assets/playoval.png')} style={styles.shapeImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShapePress('Circle')}>
            <Image source={require('../assets/playcircle.png')} style={styles.shapeImage} />
          </TouchableOpacity>
        </View>

        {/* Middle row: Rectangle and Square */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleShapePress('Rectangle')}>
            <Image source={require('../assets/playrectangle.png')} style={styles.shapeImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShapePress('Square')}>
            <Image source={require('../assets/playsquare.png')} style={styles.shapeImage} />
          </TouchableOpacity>
        </View>

        {/* Bottom row: Triangle only */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleShapePress('Triangle')}>
            <Image source={require('../assets/playtriangle.png')} style={styles.shapeImage} />
          </TouchableOpacity>
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
    zIndex: 10,
  },
  settingsCircle: {
    backgroundColor: '#0c26acff',
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    width: 25,
    height: 25,
  },
  shapeContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginVertical: 10,
  },
  shapeImage: {
    width: 160,
    height: 160,
  },
  instructionContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
 
});
