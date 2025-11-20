import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Modal,
} from "react-native";

export default function PlayGame({ navigation }) {

  // 🔥 FIX: Static image mapping (React Native requires this)
  const letterImages = {
    Aa: require("../assets/Aa.png"),
    Bb: require("../assets/Bb.png"),
    Cc: require("../assets/Cc.png"),
    Dd: require("../assets/Dd.png"),
    Ee: require("../assets/Ee.png"),
    Ff: require("../assets/Ff.png"),
    Gg: require("../assets/Gg.png"),
    Hh: require("../assets/Hh.png"),
    Ii: require("../assets/Ii.png"),
    Jj: require("../assets/Jj.png"),
    Kk: require("../assets/Kk.png"),
    Ll: require("../assets/Ll.png"),
    Mm: require("../assets/Mm.png"),
    Nn: require("../assets/Nn.png"),
    Oo: require("../assets/Oo.png"),
    Pp: require("../assets/Pp.png"),
    Qq: require("../assets/Qq.png"),
    Rr: require("../assets/Rr.png"),
    Ss: require("../assets/Ss.png"),
    Tt: require("../assets/Tt.png"),
    Uu: require("../assets/Uu.png"),
    Vv: require("../assets/Vv.png"),
    Ww: require("../assets/Ww.png"),
    Xx: require("../assets/Xx.png"),
    Yy: require("../assets/Yy.png"),
    Zz: require("../assets/Zz.png"),
  };

  // 💡 10 pages with target letters
  const pages = [
    { target: "B", letters: ["Cc","Dd","Vv","Uu","Ii","Bb","Zz","Mm"] },
    { target: "G", letters: ["Aa","Gg","Ss","Bb","Tt","Hh","Oo","Pp"] },
    { target: "M", letters: ["Mm","Ii","Ll","Uu","Ee","Ff","Tt","Oo"] },
    { target: "S", letters: ["Ss","Aa","Vv","Nn","Jj","Cc","Oo","Hh"] },
    { target: "A", letters: ["Aa","Bb","Tt","Ll","Hh","Ii","Pp","Kk"] },
    { target: "D", letters: ["Dd","Ff","Bb","Ee","Rr","Oo","Uu","Pp"] },
    { target: "O", letters: ["Oo","Aa","Nn","Gg","Ii","Ss","Tt","Dd"] },
    { target: "F", letters: ["Ff","Hh","Kk","Dd","Tt","Rr","Aa","Mm"] },
    { target: "R", letters: ["Rr","Oo","Ss","Qq","Ii","Cc","Gg","Yy"] },
    { target: "T", letters: ["Tt","Pp","Kk","Dd","Ff","Uu","Aa","Ss"] },
  ];

  // 🔥 Backgrounds per page
  const backgrounds = [
    require("../assets/55.png"),
    require("../assets/56.png"),
    require("../assets/57.png"),
    require("../assets/58.png"),
    require("../assets/59.png"),
    require("../assets/60.png"),
    require("../assets/61.png"),
    require("../assets/62.png"),
    require("../assets/63.png"),
    require("../assets/64.png"),
  ];

  const [pageIndex, setPageIndex] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const currentPage = pages[pageIndex];

  const checkAnswer = (selected) => {
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
      <TouchableOpacity
        style={styles.backTopButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsButton}>
        <Image
          source={require("../assets/settings.png")}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>

      {/* LETTER BUBBLES */}
      <View style={styles.lettersContainer}>
        {currentPage.letters.map((letter, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.letterBubble, bubblePositions[index]]}
            onPress={() => checkAnswer(letter.charAt(0).toUpperCase())}
          >
            <Image
              source={letterImages[letter]}
              style={styles.letterImage}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Correct Modal */}
      <Modal transparent visible={showCorrect} animationType="fade">
        <View style={styles.modalCenter}>
          <View style={styles.correctBox}>
            <Text style={styles.correctText}>✔ CORRECT!</Text>
          </View>
        </View>
      </Modal>

      {/* Wrong Modal */}
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

const bubblePositions = [
  { top: 100, left: 40 },
  { top: 100, right: 40 },
  { top: 180, left: 130 },
  { top: 280, left: 40 },
  { top: 280, right: 40 },
  { top: 370, left: 130 },
  { bottom: 150, left: 40 },
  { bottom: 150, right: 40 },
];

const styles = StyleSheet.create({
  background: { flex: 1 },
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
  backText: { color: "white", fontWeight: "bold" },
  settingsButton: { position: "absolute", top: 40, right: 20 },
  settingsIcon: { width: 40, height: 40 },
  lettersContainer: { flex: 1 },
  letterBubble: { position: "absolute" },
  letterImage: { width: 100, height: 100 },

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
