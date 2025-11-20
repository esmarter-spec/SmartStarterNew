import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ImageBackground,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function EditProfile({ navigation }) {
  const [profile, setProfile] = useState({
    fullName: "Ashlie Hdjimalic",
    birthdate: "January 1, 2003",
    email: "aying@example.com",
    phone: "09123456789",
    address: "America",
  });

  // 🌈 Bubble Animation Setup
  const bubbles = Array.from({ length: 7 }).map(() => ({
    x: new Animated.Value(Math.random() * width),
    y: new Animated.Value(height + Math.random() * 300),
    size: 20 + Math.random() * 25,
    delay: Math.random() * 4000,
  }));

  useEffect(() => {
    bubbles.forEach((bubble) => {
      const animate = () => {
        bubble.y.setValue(height + bubble.size);
        Animated.sequence([
          Animated.delay(bubble.delay),
          Animated.timing(bubble.y, {
            toValue: -bubble.size,
            duration: 9000 + Math.random() * 4000,
            useNativeDriver: true,
          }),
        ]).start(animate);
      };
      animate();
    });
  }, []);

  const handleSave = () => {
    Alert.alert("Profile Updated", "Your changes have been saved!");
    navigation.goBack();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("../assets/bgg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* 💧 Floating Bubbles */}
        {bubbles.map((bubble, index) => (
          <Animated.View
            key={index}
            style={[
              styles.bubble,
              {
                width: bubble.size,
                height: bubble.size,
                transform: [{ translateX: bubble.x }, { translateY: bubble.y }],
              },
            ]}
          />
        ))}

        {/* 🔙 Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>

        {/* ⚙️ Settings Button */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("SettingsP")}
        >
          <Ionicons name="settings-outline" size={26} color="#fff" />
        </TouchableOpacity>

        {/* 👤 Profile Icon */}
        <Ionicons
          name="person-circle-outline"
          size={95}
          color="#fff"
          style={styles.profileIcon}
        />

        <Text style={styles.title}>Edit Profile</Text>

        {/* 🧾 Editable Input Cards */}
        <ScrollView
          style={{ width: "90%" }}
          contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {[
            { label: "Full Name", key: "fullName" },
            { label: "Birthdate", key: "birthdate" },
            { label: "Email Address", key: "email" },
            { label: "Phone Number", key: "phone" },
            { label: "Address", key: "address" },
          ].map((item, index) => (
            <View key={index} style={styles.inputCard}>
              <Text style={styles.inputLabel}>{item.label}</Text>
              <TextInput
                style={styles.inputBox}
                value={profile[item.key]}
                onChangeText={(text) =>
                  setProfile({ ...profile, [item.key]: text })
                }
                placeholder={`Enter ${item.label}`}
                placeholderTextColor="#888"
              />
            </View>
          ))}

          {/* 💾 Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(74, 144, 226, 0.9)",
    alignItems: "center",
    paddingTop: 100,
    overflow: "hidden",
  },

  // 💧 Bubbles
  bubble: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 25,
    backgroundColor: "#0B1443",
    borderRadius: 25,
    width: 75,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },

  settingsButton: {
    position: "absolute",
    top: 40,
    right: 25,
    backgroundColor: "#0B1443",
    borderRadius: 30,
    padding: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  profileIcon: {
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },

  inputCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "90%",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  inputLabel: {
    fontSize: 12,
    color: "#4A90E2",
    fontWeight: "bold",
    marginBottom: 4,
  },

  inputBox: {
    backgroundColor: "#EEF4FF",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 13,
    color: "#0B1443",
    borderWidth: 1.3,
    borderColor: "#4A90E2",
  },

  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B1443",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },

  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 8,
  },
});
