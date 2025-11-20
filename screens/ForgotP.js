import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function ForgotP({ navigation }) {
  const bubbles = Array.from({ length: 15 }); // Increased bubbles for more visual appeal
  const anims = useRef(bubbles.map(() => new Animated.Value(0))).current;

  // 🫧 Enhanced floating bubbles animation with varying speeds and sizes
  useEffect(() => {
    anims.forEach((anim, index) => {
      const loop = () => {
        anim.setValue(0);
        Animated.timing(anim, {
          toValue: 1,
          duration: 5000 + Math.random() * 5000, // Varied duration for natural feel
          useNativeDriver: true,
        }).start(() => loop());
      };
      loop();
    });
  }, []);

  const handleReset = () => {
    Alert.alert("Password Reset", "A reset link has been sent to your email!");
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("../assets/bgg.png")} // Use your existing background
      style={styles.background}
      resizeMode="cover"
    >
      {/* 🫧 Floating bubbles with gradient effect */}
      {bubbles.map((_, i) => {
        const translateY = anims[i].interpolate({
          inputRange: [0, 1],
          outputRange: [height + 100, -100],
        });

        const translateX = anims[i].interpolate({
          inputRange: [0, 1],
          outputRange: [Math.random() * width, Math.random() * width],
        });

        const size = 20 + Math.random() * 40; // Varied sizes
        const opacity = 0.2 + Math.random() * 0.3; // Varied opacity

        return (
          <Animated.View
            key={i}
            style={[
              styles.bubble,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                opacity,
                transform: [{ translateY }, { translateX }],
              },
            ]}
          />
        );
      })}

       {/* 🔙 Back Button */}
            <TouchableOpacity style={styles.backTopButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
      

      {/* 🔐 Forgot Password Form with enhanced design */}
      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          No worries! Enter your registered email address, and we'll send you a reset link.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your email address"
            keyboardType="email-address"
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetText}>Send Reset Link</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Remember your password? <Text style={styles.linkText} onPress={() => navigation.goBack()}>Log in</Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.4)", // Slightly more opaque for visibility
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
  card: {
    width: "90%", // Slightly wider for better mobile experience
    backgroundColor: "rgba(255, 255, 255, 0.95)", // Semi-transparent white for elegance
    padding: 30,
    borderRadius: 30,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#023E8A",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    color: "#333",
  },
  resetButton: {
    backgroundColor: "#023E8A",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#023E8A",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  resetText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
  linkText: {
    color: "#023E8A",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
