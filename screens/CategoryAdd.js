import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  ImageBackground,
  Animated,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function CategoryAdd({ navigation }) {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);

  // 🌈 Bubble setup
  const bubbles = Array.from({ length: 12 }).map(() => ({
    size: Math.random() * 35 + 20,
    x: Math.random() * width,
    delay: Math.random() * 4000,
    duration: 8000 + Math.random() * 4000,
  }));

  const animY = useRef(bubbles.map(() => new Animated.Value(height))).current;

  useEffect(() => {
    bubbles.forEach((bubble, i) => {
      const loopAnim = () => {
        animY[i].setValue(height + bubble.size); // reset sa baba
        Animated.timing(animY[i], {
          toValue: -bubble.size,
          duration: bubble.duration,
          delay: bubble.delay,
          useNativeDriver: true,
        }).start(() => loopAnim());
      };
      loopAnim();
    });
  }, []);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Please allow gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!categoryName.trim()) {
      Alert.alert("Missing Info", "Please enter a category name.");
      return;
    }
    Alert.alert("Saved!", `Category "${categoryName}" has been saved.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Background Image */}
      <ImageBackground
        source={require("../assets/bgg.png")}
        style={styles.background}
        resizeMode="cover"
      >
        {/* 🌈 Floating background bubbles (rising up) */}
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

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack && navigation.goBack()}
        >
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>

       <TouchableOpacity
         style={styles.settingsIcon}
         onPress={() => navigation.navigate('SettingsP')} // ✅ navigate to SettingsP
       >
         <Ionicons name="settings-sharp" size={28} color="#000" />
       </TouchableOpacity>

        {/* Header Image (Kids) */}
        <Image
          source={require("../assets/kids.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />

        {/* Image Box */}
        <View style={styles.imageBox}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <Text style={styles.placeholderText}>No image selected</Text>
          )}
        </View>

        {/* Input + Add Image */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Category Name"
            value={categoryName}
            onChangeText={setCategoryName}
          />
          <TouchableOpacity style={styles.addButton} onPress={pickImage}>
            <Text style={styles.addText}>Add Image</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
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

  // 🌈 Bubble style
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
    top: 155,
    alignSelf: "center",
    zIndex: 0,
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
    zIndex: 1,
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
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    width: 140,
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#023E8A",
    borderRadius: 20,
    paddingHorizontal: 30,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  addText: {
    fontWeight: "500",
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
