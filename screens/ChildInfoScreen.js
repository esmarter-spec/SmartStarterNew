import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ImageBackground, TouchableOpacity,
  TextInput, KeyboardAvoidingView, ScrollView, Platform, Animated, Dimensions
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function ChildInfoScreen({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(null);

  const bubbleCount = 12;
  const bubbles = Array.from({ length: bubbleCount }, (_, i) => i);

  return (
    <ImageBackground
      source={require('../assets/bgg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* 🫧 Animated Bubbles Layer */}
      {bubbles.map((i) => (
        <MovingBubble key={i} delay={i * 800} />
      ))}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Child Info</Text>

            {/* Gender Selection */}
            <View style={styles.genderContainer}>
              <TouchableOpacity onPress={() => setGender('male')}>
                <FontAwesome5
                  name="mars"
                  size={100}
                  color={gender === 'male' ? '#003399' : '#3399FF'}
                  style={styles.genderIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGender('female')}>
                <FontAwesome5
                  name="venus"
                  size={100}
                  color={gender === 'female' ? '#CC0066' : '#FF66A3'}
                  style={styles.genderIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Nickname + Age */}
            <TextInput
              style={styles.input}
              placeholder="Nickname"
              placeholderTextColor="#000"
              value={nickname}
              onChangeText={setNickname}
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              placeholderTextColor="#000"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />

            {/* Done Button */}
            <AnimatedTouchable
              style={styles.doneButton}
              onPress={() => {
                if (!gender) {
                  alert('Please select a gender');
                  return;
                }
                if (!nickname || !age) {
                  alert('Please fill in all fields');
                  return;
                }

                // ✅ No backend — just navigate to Category1
                alert("✅ Child info saved successfully!");
                navigation.navigate("Category1");
              }}
            >
              <Text style={styles.doneText}>Done</Text>
            </AnimatedTouchable>
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

// 🫧 Bubble Animation
const MovingBubble = ({ delay }) => {
  const translateX = useRef(new Animated.Value(-100)).current;
  const translateY = useRef(new Animated.Value(Math.random() * height)).current;
  const bubbleSize = Math.random() * 40 + 20;

  useEffect(() => {   
    const moveBubble = () => {
      translateX.setValue(-100);
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(translateX, {
          toValue: width + 100,
          duration: 8000 + Math.random() * 3000,
          useNativeDriver: true,
        }),
      ]).start(() => moveBubble());
    };
    moveBubble();
  }, [delay]);

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          width: bubbleSize,
          height: bubbleSize,
          backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`,
          borderRadius: bubbleSize / 2,
          transform: [{ translateX }, { translateY }],
        },
      ]}
    />
  );
};

// ✨ Small shake animation for the button
const AnimatedTouchable = ({ children, style, onPress }) => {
  const shake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = () => {
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 200, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.delay(1000),
      ]).start(loop);
    };
    loop();
  }, []);

  const shakeInterpolation = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-2deg', '2deg'],
  });

  return (
    <Animated.View style={[style, { transform: [{ rotate: shakeInterpolation }] }]}>
      <TouchableOpacity onPress={onPress}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, alignItems: 'center', padding: 20, justifyContent: 'center' },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 80,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  genderContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 40 },
  genderIcon: { marginHorizontal: 30 },
  input: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    width: '90%',
    marginVertical: 10,
    textAlign: 'center',
  },
  doneButton: {
    backgroundColor: '#001F4D',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 25,
    marginTop: 40,
    elevation: 3,
  },
  doneText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  bubble: {
    position: 'absolute',
  },
});
