import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  Animated,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function AddCategoryScreen({ navigation }) {
  const categories = [
    {
      header: require('../assets/alphabets.png'),
      main: require('../assets/abc.png'),
      headerStyle: { width: width * 0.9, height: 150 },
      kidsStyle: { width: width * 0.7, height: 240 },
    },
    {
      header: require('../assets/numbers.png'),
      main: require('../assets/123.png'),
      headerStyle: { width: width * 0.8, height: 140 },
      kidsStyle: { width: width * 0.7, height: 240 },
    },
    {
      header: require('../assets/animals1.png'),
      main: require('../assets/animals.png'),
      headerStyle: { width: width * 0.8, height: 150 },
      kidsStyle: { width: width * 2.0, height: 250 },
    },
    {
      header: require('../assets/shapes1.png'),
      main: require('../assets/shapes.png'),
      headerStyle: { width: width * 0.8, height: 130 },
      kidsStyle: { width: width * 0.9, height: 250 },
    },
  ];

  const [index, setIndex] = useState(0);
  const current = categories[index];

  const handleNext = () =>
    setIndex(prev => (prev < categories.length - 1 ? prev + 1 : 0));

  const handleBack = () =>
    setIndex(prev => (prev > 0 ? prev - 1 : categories.length - 1));

  const handleAddCategory = () => navigation.navigate('CategoryAdd');

  // 🌈 Floating bubbles animation
  const letters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
  const numbers = [...'123456789'];
  const animals = ['Dog', 'Cat', 'Lion', 'Frog', 'Bird', 'Fish'];
  const shapes = ['Circle', 'Square', 'Triangle', 'Star', 'Heart'];
  const contents = [...letters, ...numbers, ...animals, ...shapes];
  const colors = ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff'];

  const bubbles = Array.from({ length: 20 }).map(() => ({
    size: Math.random() * 40 + 25,
    x: Math.random() * width,
    delay: Math.random() * 5000,
    duration: 8000 + Math.random() * 5000,
    color: colors[Math.floor(Math.random() * colors.length)],
    text: contents[Math.floor(Math.random() * contents.length)],
  }));

  const animY = useRef(bubbles.map(() => new Animated.Value(height))).current;

  useEffect(() => {
    bubbles.forEach((bubble, i) => {
      const loop = () => {
        animY[i].setValue(height + bubble.size);
        Animated.timing(animY[i], {
          toValue: -bubble.size,
          duration: bubble.duration,
          delay: bubble.delay,
          useNativeDriver: true,
        }).start(() => loop());
      };
      loop();
    });
  }, []);

  // ⚡ Animation for Add Category button
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleAddPress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.15,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(() => {
      handleAddCategory(); // Navigate after animation
    });
  };

  return (
    <ImageBackground source={require('../assets/bgg.png')} style={styles.container}>
      {/* 🌈 Floating bubbles */}
      <View style={StyleSheet.absoluteFill}>
        {bubbles.map((bubble, i) => (
          <Animated.View
            key={i}
            style={[
              styles.bubble,
              {
                width: bubble.size,
                height: bubble.size,
                backgroundColor: bubble.color,
                left: bubble.x,
                transform: [{ translateY: animY[i] }],
              },
            ]}
          >
            <Text
              style={[
                styles.bubbleText,
                bubble.text.length > 3 && { fontSize: 10 },
              ]}
            >
              {bubble.text}
            </Text>
          </Animated.View>
        ))}
      </View>

      {/* ⚙️ Settings */}
<TouchableOpacity
  style={styles.settingsIcon}
  onPress={() => navigation.navigate('SettingsP')} // ✅ navigate to SettingsP
>
  <Ionicons name="settings-sharp" size={28} color="#000" />
</TouchableOpacity>

      {/* 🧒 Header */}
      <Image
        source={current.header}
        style={[styles.headerImage, current.headerStyle]}
        resizeMode="contain"
      />

      {/* 🧩 Main Image */}
      <Image
        source={current.main}
        style={[styles.kidsImage, current.kidsStyle]}
        resizeMode="contain"
      />

      {/* ⬅️➡️ Navigation */}
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={require('../assets/back.png')}
            style={styles.arrowImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Image
            source={require('../assets/next.png')}
            style={styles.arrowImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* ➕ Add Category (Animated) */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.addButtonText}>Add Category</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* 🧭 Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home" size={28} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.activeNav]}>
          <MaterialCommunityIcons name="cards-outline" size={28} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('AddFlashcards')}
        >
          <MaterialCommunityIcons
            name="text-box-multiple-outline"
            size={28}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82c1ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    position: 'absolute',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.85,
  },
  bubbleText: {
    color: '#023E8A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  settingsIcon: { position: 'absolute', top: 50, right: 25, zIndex: 10 },
  headerImage: { position: 'absolute', top: 120, alignSelf: 'center', zIndex: 5 },
  kidsImage: { alignSelf: 'center', marginTop: 120 },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: 25,
  },
  arrowImage: { width: 80, height: 80 },
  addButton: {
    marginTop: 20,
    backgroundColor: '#003366',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    flexDirection: 'row',
  },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(130, 193, 255, 0.9)',
    width: '100%',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  navItem: { padding: 10, borderRadius: 10 },
  activeNav: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
});
