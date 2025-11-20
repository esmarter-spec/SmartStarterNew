import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AboutusP({ navigation }) {
  const [modalVisible, setModalVisible] = useState(true);

  const handleEditPress = () => {
    Alert.alert("Edit", "Edit About Us content here!");
    // Or if you have a screen: navigation.navigate("EditAboutUs");
  };

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <Image
        source={require("../assets/kids.png")}
        style={styles.headerImage}
        resizeMode="contain"
      />

      {/* Modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* ❌ Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                navigation.goBack();
              }}
            >
              <Image
                source={require("../assets/close.png")}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* 🧒 About Us Banner */}
            <Image
              source={require("../assets/aboutus.png")}
              style={styles.aboutBanner}
              resizeMode="contain"
            />

            {/* ℹ️ Info Icon sa kaliwa */}
            <Image
              source={require("../assets/info.png")}
              style={styles.infoIcon}
              resizeMode="contain"
            />

            {/* ✏️ Edit Icon sa lower-right */}
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
              <MaterialCommunityIcons name="square-edit-outline" size={32} color="#0B1443" />
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4DA6FF",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerImage: {
    width: "105%",
    height: 205,
    marginTop: 130,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 270,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 20,
    alignItems: "center",
    elevation: 8,
    borderWidth: 10,
    borderColor: "#003366",
    height: "55%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: -40,
    right: -19,
    zIndex: 10,
  },
  closeIcon: {
    width: 60,
    height: 100,
  },
  aboutBanner: {
    position: "absolute",
    top: -50,
    alignSelf: "center",
    width: 200,
    height: 80,
  },
  infoIcon: {
    position: "absolute",
    top: -20,
    left: -50,
    width: 150,
    height: 100,
  },
  editButton: {
    position: "absolute",
    bottom: 10,
    right: 15,
    backgroundColor: "transparent",
  },
});
