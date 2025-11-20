import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  // ✅ Hardcoded Admin Account
  const ADMIN_EMAIL = 'admin@gmail.com';
  const ADMIN_PASSWORD = 'admin123';

  const bubbleCount = 25;
  const bubbles = Array.from({ length: bubbleCount }).map(() => ({
    y: Math.random() * height,
    size: Math.random() * 35 + 15,
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
          duration: bubble.durationX,
          delay: bubble.delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => animateBubble());
      };
      animateBubble();
    });
  }, []);

  // ✅ Local Login (No backend)
  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (!agree) {
      alert('You must agree to the Terms of Use and Privacy Policy');
      return;
    }

    // Admin Login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      alert('👑 Welcome Admin!');
      navigation.navigate('AdminDashboard');
      return;
    }

    // Example user validation (you can change this)
    if (email.endsWith('@gmail.com') && password.length >= 6) {
      alert('✅ Welcome User!');
      navigation.navigate('Category1');
    } else {
      alert('Account not found. Please sign up first.');
    }
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
                top: bubble.y,
                transform: [{ translateX: animX[i] }],
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotContainer}
          onPress={() => navigation.navigate('ForgotP')}
          activeOpacity={0.7}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgree(!agree)}
          >
            {agree && <Text style={styles.checkmark}>✔</Text>}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            By clicking{' '}
            <Text style={{ fontWeight: 'bold' }}>‘Create Account’</Text> above, I agree that I have read and agree to{' '}
            <Text style={styles.link}>Terms of Use</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: { width: 300, height: 220, marginBottom: 20 },
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
  forgotContainer: { alignSelf: 'flex-end', marginRight: 30, marginTop: 5 },
  forgotText: { color: '#000', fontSize: 14 },
  loginButton: {
    backgroundColor: '#001f4d',
    paddingVertical: 12,
    paddingHorizontal: 120,
    borderRadius: 25,
    marginTop: 20,
    elevation: 3,
  },
  loginText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 20,
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
    backgroundColor: '#fff',
  },
  checkmark: { fontSize: 16, color: '#0066cc', fontWeight: 'bold' },
  termsText: { fontSize: 12, color: '#000', flex: 1, lineHeight: 16 },
  link: { color: '#0066cc', fontWeight: 'bold' },
});
