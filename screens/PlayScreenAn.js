import React, { useRef, useEffect, useState } from "react";
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
} from "react-native";

const { width, height } = Dimensions.get("window");
const NUM_BUBBLES = 15;

export default function Animals({ navigation }) {
  // 🔟 10 BACKGROUNDS
  const backgrounds = [
    require("../assets/105.png"),
    require("../assets/106.png"),
    require("../assets/107.png"),
    require("../assets/108.png"),
    require("../assets/109.png"),
    require("../assets/110.png"),
    require("../assets/111.png"),
    require("../assets/112.png"),
    require("../assets/113.png"),
    require("../assets/114.png"),
  ];

  // 🐾 ANIMAL IMAGES
  const animalImages = {
    Zebra: require("../assets/playzebra.png"),
    Elephant: require("../assets/playelephant.png"),
    Giraffe: require("../assets/playgiraffe.png"),
    Fox: require("../assets/playfox.png"),
    Cat: require("../assets/playcat.png"),
    Tiger: require("../assets/playtiger.png"),
    Pig: require("../assets/playpig.png"),
    Bear: require("../assets/playbear.png"),
    Monkey: require("../assets/playmonkey.png"),
    Lion: require("../assets/playlion.png"),
    Chicken: require("../assets/playchicken.png"),
    Turtle: require("../assets/playturtle.png"),
    Fish: require("../assets/playfish.png"),
    Dog: require("../assets/playdog.png"),
    Frog: require("../assets/playfrog.png"),
  };

  // 🔟 10 PAGES (TARGET + 4 ANIMALS PER PAGE)
  const pages = [
    { target: "Dog", animals: ["Dog", "Cat", "Pig", "Zebra"] },
    { target: "Zebra", animals: ["Zebra", "Lion", "Tiger", "Bear"] },
    { target: "Elephant", animals: ["Elephant", "Fox", "Giraffe", "Cat"] },
    { target: "Lion", animals: ["Lion", "Monkey", "Pig", "Dog"] },
    { target: "Chicken", animals: ["Chicken", "Turtle", "Fish", "Cat"] },
    { target: "Giraffe", animals: ["Giraffe", "Bear", "Fox", "Dog"] },
    { target: "Monkey", animals: ["Monkey", "Lion", "Zebra", "Tiger"] },
    { target: "Pig", animals: ["Pig", "Cat", "Chicken", "Frog"] },
    { target: "Turtle", animals: ["Turtle", "Fish", "Dog", "Fox"] },
    { target: "Tiger", animals: ["Tiger", "Cat", "Lion", "Monkey"] },
  ];

  const [pageIndex, setPageIndex] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const currentPage = pages[pageIndex];

  // 🫧 BUBBLES
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

  // 🐾 CHECK IF CORRECT
  const handlePress = (selected) => {
    if (selected === currentPage.target) {
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        if (pageIndex < pages.length - 1) {
          setPageIndex(pageIndex + 1);
        } else {
          navigation.navigate("Home");
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
    >
      {/* 🫧 Bubbles */}
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
      <TouchableOpacity
        style={styles.backTopButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      {/* ⚙ Settings */}
      <TouchableOpacity style={styles.settingsButton}>
        <View style={styles.settingsCircle}>
          <Image
            source={require("../assets/settings.png")}
            style={styles.settingsIcon}
          />
        </View>
      </TouchableOpacity>

      {/* 🐾 ANIMAL GRID */}
      <View style={styles.animalContainer}>
        {currentPage.animals.map((animal, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => handlePress(animal)}
            style={styles.animalWrapper}
          >
            <Image source={animalImages[animal]} style={styles.animalImage} />
          </TouchableOpacity>
        ))}
      </View>

      {/* ✔ Correct */}
      <Modal transparent visible={showCorrect} animationType="fade">
        <View style={styles.modalCenter}>
          <View style={styles.correctBox}>
            <Text style={styles.correctText}>✔ CORRECT!</Text>
          </View>
        </View>
      </Modal>

      {/* ❌ Wrong */}
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

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  bubble: { position: "absolute", backgroundColor: "rgba(255,255,255,0.3)" },

  backTopButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#1E2A78",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    zIndex: 10,
  },
  backText: { color: "white", fontWeight: "bold", fontSize: 14 },

  settingsButton: { position: "absolute", top: 40, right: 20, zIndex: 10 },
  settingsCircle: {
    backgroundColor: "#0c26acff",
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: { width: 25, height: 25 },

  animalContainer: {
    marginTop: 120,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  animalWrapper: { margin: 12 },
  animalImage: { width: 150, height: 150 },

  modalCenter: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  correctBox: {
    backgroundColor: "#7CF77C",
    padding: 30,
    borderRadius: 20,
  },
  wrongBox: {
    backgroundColor: "#FF8C8C",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },
  correctText: { fontSize: 32, fontWeight: "bold" },
  wrongText: { fontSize: 32, fontWeight: "bold" },

  tryAgainBtn: {
    marginTop: 15,
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  tryAgainText: { fontSize: 18, fontWeight: "bold" },
});
