import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground,
  KeyboardAvoidingView, Platform, ScrollView, Keyboard, TouchableWithoutFeedback,
  Animated, Dimensions, Easing,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const bubbleCount = 25;
  const bubbles = Array.from({ length: bubbleCount }).map(() => ({
    x: Math.random() * width,
    size: Math.random() * 35 + 15,
    durationY: Math.random() * 4000 + 8000,
    durationX: Math.random() * 4000 + 8000,
    delay: Math.random() * 1000,
  }));

  const animY = useRef(bubbles.map(() => new Animated.Value(height + 100))).current;
  const animX = useRef(bubbles.map(() => new Animated.Value(0))).current;

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
          animateBubble();
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
  }, []);

  // 🌟 Sign Up (no backend)
  const handleSignUp = () => {
    if (!nickname || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (!agree) {
      alert('You must agree to the Terms of Use and Privacy Policy');
      return;
    }

    // Just a fake success (no backend)
    alert('✅ Account created successfully!');
    navigation.navigate('ChildInfo');
  };

  return (
    <ImageBackground
      source={require('../assets/bgg.png')}
      style={styles.background}
      resizeMode="cover"
    >
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

      <TouchableOpacity
        style={styles.topLogin}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={styles.container}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.cardsImage}
                resizeMode="contain"
              />

              <Text style={styles.title}>Welcome!</Text>

              <TextInput
                style={styles.input}
                placeholder="Nickname"
                placeholderTextColor="#000"
                value={nickname}
                onChangeText={setNickname}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#000"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#000"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>

              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setAgree(!agree)}
                >
                  {agree && <Text style={styles.checkmark}>✔</Text>}
                </TouchableOpacity>

                <Text style={styles.termsText}>
                  By clicking 'Create Account' above, I agree that I have read and agree to{' '}
                  <Text style={styles.link}>Terms of Use</Text> and{' '}
                  <Text style={styles.link}>Privacy Policy</Text>.
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  topLogin: { position: 'absolute', top: 40, right: 10, padding: 10, zIndex: 99 },
  loginText: { fontSize: 14, color: '#000' },
  loginLink: { color: '#0066cc', fontWeight: 'bold' },
  container: { flex: 1, alignItems: 'center', padding: 20, marginTop: 40 },
  cardsImage: { width: 300, height: 220, marginBottom: 0 },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20, color: '#000' },
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
  signUpButton: {
    backgroundColor: '#001f4d',
    paddingVertical: 15,
    paddingHorizontal: 105,
    borderRadius: 25,
    marginTop: 20,
    elevation: 3,
  },
  signUpText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 25,
    paddingHorizontal: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
    backgroundColor: '#fff',
  },
  checkmark: { fontSize: 16, color: '#0066cc', fontWeight: 'bold' },
  termsText: { fontSize: 12, color: '#000', flex: 1, lineHeight: 16 },
  link: { color: '#0066cc', fontWeight: 'bold' },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#fff',
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
});
