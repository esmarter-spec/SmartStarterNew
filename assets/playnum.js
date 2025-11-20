import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const NUM_BUBBLES = 15;

export default function Playnum({ navigation }) {

  // 🔢 Number image mapping
  const numImages = {
    1: require('../assets/num1.png'),
    2: require('../assets/num2.png'),
    3: require('../assets/num3.png'),
    4: require('../assets/num4.png'),
    5: require('../assets/num5.png'),
    6: require('../assets/num6.png'),
    7: require('../assets/num7.png'),
    8: require('../assets/num8.png'),
    9: require('../assets/num9.png'),
    10: require('../assets/num10.png'),
    11: require('../assets/num11.png'),
    12: require('../assets/num12.png'),
    13: require('../assets/num13.png'),
    14: require('../assets/num14.png'),
    15: require('../assets/num15.png'),

  };

  // 🔥 Backgrounds per page
  const backgrounds = [
    require('../assets/66.png'),
    require('../assets/67.png'),
    require('../assets/68.png'),
    require('../assets/69.png'),
    require('../assets/70.png'),
    require('../assets/71.png'),
    require('../assets/72.png'),
    require('../assets/73.png'),
    require('../assets/74.png'),
  ];

  // 📌 Pages with target number
  const pages = [
    { target: 2, nums: [1, 4, 6, 8, 3, 5, 2, 9] },
    { target: 8, nums: [7, 2, 5, 1, 9, 4, 3, 8] },
    { target: 10, nums: [3, 1, 9, 10, 6, 5, 4, 7] },
    { target: 7, nums: [9, 2, 8, 3, 5, 7, 1, 4] },
    { target: 9, nums: [1, 8, 5, 3, 7, 2, 4, 9] },
    { target: 3, nums: [6, 3, 4, 8, 9, 1, 5, 2] },
    { target: 12, nums: [2, 5, 6, 1, 3, 8, 9, 12] },
    { target: 14, nums: [5, 9, 8, 14, 1, 2, 6, 3] },
    { target: 4, nums: [8, 6, 4, 2, 7, 5, 1, 9] },
    { target: 5, nums: [8, 6, 3, 2, 7, 5, 1, 9] },
  ];

  const [pageIndex, setPageIndex] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const currentPage = pages[pageIndex];

  // 🫧 Floating bubble animations
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

  // 🎯 Check Answer
  const checkAnswer = (selected) => {
    if (selected === currentPage.target) {
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        if (pageIndex < pages.length - 1) {
          setPageIndex(pageIndex + 1); // next page
        } else {
          navigation.navigate("Home"); // if finished
        }
      }, 1000);
    } else {
      setShowWrong(true);
    }
  };

  return (
    <ImageBackground
      source={backgrounds[pageIndex]}
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

      {/* 🔙 Back */}
      <TouchableOpacity style={styles.backTopButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      {/* ⚙ Settings */}
      <TouchableOpacity style={styles.settingsButton}>
        <View style={styles.settingsCircle}>
          <Image
            source={require('../assets/settings.png')}
            style={styles.settingsIcon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      {/* 🔢 NUMBERS */}
      <View style={styles.lettersContainer}>
        {currentPage.nums.map((num, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.letterBubble, bubblePositions[index]]}
            onPress={() => checkAnswer(num)}
          >
            <Image
              source={numImages[num]}
              style={styles.letterImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* ✔ Correct Modal */}
      <Modal transparent visible={showCorrect} animationType="fade">
        <View style={styles.modalCenter}>
          <View style={styles.correctBox}>
            <Text style={styles.correctText}>✔ CORRECT!</Text>
          </View>
        </View>
      </Modal>

      {/* ✖ Wrong Modal */}
      <Modal transparent visible={showWrong} animationType="fade">
        <View style={styles.modalCenter}>
          <View style={styles.wrongBox}>
            <Text style={styles.wrongText}>✖ WRONG!</Text>
            <TouchableOpacity
              style={styles.tryAgainBtn}
              onPress={() => setShowWrong(false)}
            >
              <Text style={styles.tryAgainText}>TRY AGAIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ImageBackground>
  );
}

const bubblePositions = [
  { top: 80, left: 10 },
  { top: 80, right: 10 },
  { top: 190, left: 100 },
  { top: 280, left: 10 },
  { top: 280, right: 10 },
  { top: 390, left: 110 },
  { bottom: 130, left: 10 },
  { bottom: 130, right: 10 },
];

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
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
  lettersContainer: {
    flex: 1,
  },
  letterBubble: {
    position: 'absolute',
  },
  letterImage: {
    width: 140,
    height: 140,
  },

  // MODALS
  modalCenter: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctBox: {
    backgroundColor: '#7CF77C',
    padding: 30,
    borderRadius: 20,
  },
  wrongBox: {
    backgroundColor: '#FF8C8C',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  correctText: { fontSize: 32, fontWeight: 'bold' },
  wrongText: { fontSize: 32, fontWeight: 'bold' },
  tryAgainBtn: {
    marginTop: 15,
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  tryAgainText: { fontSize: 18, fontWeight: 'bold' },
});
