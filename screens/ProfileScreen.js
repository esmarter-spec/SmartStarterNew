import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [profile, setProfile] = useState({
    fullName: "Ashlie Hdjimalic",
    birthdate: "January 1, 2003",
    email: "aying@example.com",
    phone: "09123456789",
    address: "America",
  });

  useEffect(() => {
    if (route.params?.updatedProfile) {
      setProfile(route.params.updatedProfile);
    }
  }, [route.params?.updatedProfile]);

  const handleEditPress = () => {
    navigation.navigate("EditProfile", { profile });
  };

  const handleBack = () => {
    navigation.navigate("SettingsP");
  };

  // 🫧 Floating bubbles animation
  const bubbles = Array.from({ length: 7 }).map(() => ({
    x: new Animated.Value(Math.random() * width),
    y: new Animated.Value(height + Math.random() * 200),
    size: Math.random() * 60 + 30,
    opacity: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 4000 + 4000,
  }));

  useEffect(() => {
    bubbles.forEach((bubble) => {
      const float = () => {
        bubble.y.setValue(height + 100);
        Animated.timing(bubble.y, {
          toValue: -100,
          duration: bubble.duration,
          useNativeDriver: true,
        }).start(() => float());
      };
      float();
    });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/bgg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* 🫧 Floating bubbles */}
        {bubbles.map((b, index) => (
          <Animated.View
            key={index}
            style={[
              styles.bubble,
              {
                width: b.size,
                height: b.size,
                opacity: b.opacity,
                transform: [{ translateX: b.x }, { translateY: b.y }],
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
          style={styles.settingsIcon}
          onPress={() => navigation.navigate("SettingsP")}
        >
          <Ionicons name="settings-outline" size={28} color="#fff" />
        </TouchableOpacity>

        {/* 👤 Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle-outline" size={100} color="#fff" />
            <TouchableOpacity style={styles.editIcon} onPress={handleEditPress}>
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={26}
                color="#4A90E2"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{profile.fullName}</Text>
          <Text style={styles.userEmail}>{profile.email}</Text>
        </View>

        {/* 📝 Profile Info Cards */}
        <Text style={styles.title}>Profile Information</Text>
        <View style={styles.detailsContainer}>
          {[
            { icon: "person-outline", label: "Full Name", info: profile.fullName },
            { icon: "calendar-outline", label: "Birthdate", info: profile.birthdate },
            { icon: "mail-outline", label: "Email", info: profile.email },
            { icon: "call-outline", label: "Phone", info: profile.phone },
            { icon: "location-outline", label: "Address", info: profile.address },
          ].map((item, index) => (
            <View key={index} style={styles.detailCard}>
              <View style={styles.iconContainer}>
                <Ionicons name={item.icon} size={22} color="#fff" />
              </View>
              <View style={styles.detailText}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.info}>{item.info}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(74, 144, 226, 0.85)",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
    overflow: "hidden",
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
    zIndex: 10,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  settingsIcon: {
    position: "absolute",
    top: 40,
    right: 25,
    backgroundColor: "#0B1443",
    padding: 10,
    borderRadius: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 10,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 10,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 10,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  userEmail: {
    fontSize: 14,
    color: "#f5f5f5",
    opacity: 0.9,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    marginBottom: 10,
  },
  detailsContainer: {
    width: "90%",
  },
  detailCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  iconContainer: {
    backgroundColor: "#4A90E2",
    borderRadius: 10,
    padding: 8,
    marginRight: 10,
  },
  detailText: { flex: 1 },
  label: {
    fontSize: 11,
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  info: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  bubble: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 50,
  },
});

