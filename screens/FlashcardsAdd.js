import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ImageBackground,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function FlashcardsAdd({ navigation }) {
  const [flashcardName, setFlashcardName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);

  // 🌈 Floating bubbles animation
  const bubbles = Array.from({ length: 15 }).map(() => ({
    size: Math.random() * 35 + 20,
    x: Math.random() * width,
    delay: Math.random() * 800,
    duration: 7000 + Math.random() * 3000,
  }));

  const animY = useRef(bubbles.map(() => new Animated.Value(height))).current;

  useEffect(() => {
    bubbles.forEach((bubble, i) => {
      const loopAnim = () => {
        animY[i].setValue(height + bubbles[i].size);
        Animated.timing(animY[i], {
          toValue: -bubbles[i].size,
          duration: bubbles[i].duration,
          delay: bubbles[i].delay,
          useNativeDriver: true,
        }).start(() => loopAnim());
      };
      loopAnim();
    });
  }, []);

  // 📸 Image Picker (updated for Expo SDK 52+)
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Please allow gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.IMAGE], // ✅ Updated syntax
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 💾 Save Flashcard
  const handleSave = () => {
    if (!flashcardName.trim() || !categoryName.trim()) {
      Alert.alert("Missing Info", "Please fill out all fields.");
      return;
    }
    Alert.alert("Saved!", `Flashcard "${flashcardName}" saved successfully!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/bgg.png")}
        style={styles.background}
        resizeMode="cover"
      >
        {/* 🌈 Floating bubbles */}
        <View style={StyleSheet.absoluteFill}>
          {bubbles.map((bubble, i) => (
            <Animated.View
              key={i}
              style={[
                styles.floatingBubble,
                {
                  width: bubble.size,
                  height: bubble.size,
                  left: bubble.x,
                  transform: [{ translateY: animY[i] }],
                },
              ]}
            />
          ))}
        </View>

        {/* 🔙 Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => navigation.navigate('SettingsP')} // ✅ navigate to SettingsP
        >
          <Ionicons name="settings-sharp" size={28} color="#000" />
        </TouchableOpacity>

        {/* 👶 Header image */}
        <Image
          source={require("../assets/kids.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />

        {/* 📦 Flashcard preview box */}
        <View style={styles.imageBox}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <Text style={styles.placeholderText}>No image selected</Text>
          )}
        </View>

        {/* ✏️ Inputs */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Flashcard name"
            value={flashcardName}
            onChangeText={setFlashcardName}
          />
          <TextInput
            style={styles.input}
            placeholder="Category name"
            value={categoryName}
            onChangeText={setCategoryName}
          />
        </View>

        {/* 📸 Add Image Button */}
        <TouchableOpacity style={styles.addButton} onPress={pickImage}>
          <Text style={styles.addText}>Add Image</Text>
        </TouchableOpacity>

        {/* 💾 Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4AA3FF",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingBubble: {
    position: "absolute",
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#023E8A",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    zIndex: 10,
  },
  backText: {
    color: "white",
    fontWeight: "bold",
  },
  settingsIcon: {
    position: "absolute",
    top: 50,
    right: 25,
  },
  headerImage: {
    width: 400,
    height: 230,
    position: "absolute",
    top: 110,
    alignSelf: "center",
  },
  imageBox: {
    width: 280,
    height: 260,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  placeholderText: {
    color: "#888",
  },
  inputRow: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    width: 140,
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: "#023E8A",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 8,
    marginTop: 15,
  },
  addText: {
    fontWeight: "600",
    color: "#fff",
  },
  saveButton: {
    position: "absolute",
    bottom: 90,
    right: 25,
    backgroundColor: "#023E8A",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
