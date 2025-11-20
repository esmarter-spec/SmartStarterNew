import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const BASE_ITEMS = ['A', 'B', '1', '2', '🐶', '🐱', '⭐', '🔺', '🟢', '💎'];
const COLORS = [
  '#ff9ff3',
  '#feca57',
  '#54a0ff',
  '#5f27cd',
  '#1dd1a1',
  '#48dbfb',
  '#f368e0',
  '#ff6b6b',
  '#10ac84',
];

const FLOATING_ITEMS = Array.from({ length: 25 }, () => ({
  label: BASE_ITEMS[Math.floor(Math.random() * BASE_ITEMS.length)],
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  size: 40 + Math.random() * 30,
}));

export default function AdminDashboard({ navigation }) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCategories: 0,
    totalFlashcards: 0,
  });

  // 🔹 Fetch all stats dynamically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          'http://192.168.100.176/smart_db/get_total_users.php',
          'http://192.168.100.176/smart_db/get_active_users.php',
          'http://192.168.100.176/smart_db/get_total_categories.php',
          'http://192.168.100.176/smart_db/get_total_flashcards.php',
        ];

        const [userRes, activeRes, catRes, flashRes] = await Promise.all(
          urls.map((url) => fetch(url).then((r) => r.json()))
        );

        setStats({
          totalUsers: userRes.totalUsers || 0,
          activeUsers: activeRes.activeUsers || 0,
          totalCategories: catRes.totalCategories || 0,
          totalFlashcards: flashRes.totalFlashcards || 0,
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      }
    };

    fetchData();
  }, []);

  // 🔹 Floating background animation
  const animations = useRef(
    Array.from({ length: FLOATING_ITEMS.length }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(height + 100),
    }))
  ).current;

  useEffect(() => {
    animations.forEach((anim) => {
      const floatLoop = () => {
        const startX = Math.random() * width;
        const startY = height + 100;
        const endX = startX + (Math.random() - 0.5) * width * 0.8;
        const endY = -150;

        anim.x.setValue(startX);
        anim.y.setValue(startY);

        Animated.parallel([
          Animated.timing(anim.x, {
            toValue: endX,
            duration: 10000 + Math.random() * 5000,
            useNativeDriver: true,
          }),
          Animated.timing(anim.y, {
            toValue: endY,
            duration: 10000 + Math.random() * 5000,
            useNativeDriver: true,
          }),
        ]).start(() => floatLoop());
      };
      setTimeout(floatLoop, Math.random() * 6000);
    });
  }, []);

  return (
    <ImageBackground
      source={require('../assets/bgg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Floating items */}
      <View style={StyleSheet.absoluteFill}>
        {FLOATING_ITEMS.map((item, i) => {
          const anim = animations[i];
          return (
            <Animated.View
              key={i}
              style={[
                styles.floatingItem,
                {
                  width: item.size,
                  height: item.size,
                  borderRadius: item.size / 2,
                  backgroundColor: item.color + '60',
                  transform: [{ translateX: anim.x }, { translateY: anim.y }],
                },
              ]}
            >
              <Text style={styles.floatingText}>{item.label}</Text>
            </Animated.View>
          );
        })}
      </View>

      {/* Dashboard Cards */}
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigation.navigate('SettingsP')}
        >
          <Ionicons name="settings-sharp" size={28} color="black" />
        </TouchableOpacity>

        <View style={styles.cardContainer}>
          <View style={styles.row}>
            <View style={styles.card}>
              <Ionicons name="person-outline" size={50} color="#000" />
              <Text style={styles.number}>{stats.totalUsers}</Text>
              <Text style={styles.label}>Total Users</Text>
            </View>

            <View style={styles.card}>
              <Ionicons name="person" size={50} color="#000" />
              <Text style={styles.number}>{stats.activeUsers}</Text>
              <Text style={styles.label}>Active Users</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.card}>
              <MaterialCommunityIcons name="cards-outline" size={50} color="#000" />
              <Text style={styles.number}>{stats.totalCategories}</Text>
              <Text style={styles.label}>Total Categories</Text>
            </View>

            <View style={styles.card}>
              <MaterialCommunityIcons
                name="text-box-multiple-outline"
                size={50}
                color="#000"
              />
              <Text style={styles.number}>{stats.totalFlashcards}</Text>
              <Text style={styles.label}>Total Flashcards</Text>
            </View>
          </View>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={[styles.navItem, styles.activeNav]}>
            <Ionicons name="home" size={28} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('AddCategory')}
          >
            <MaterialCommunityIcons name="cards-outline" size={28} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('SettingsP')}
          >
            <MaterialCommunityIcons
              name="text-box-multiple-outline"
              size={28}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  floatingItem: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  container: { flex: 1, paddingTop: 50 },
  settingsBtn: { position: 'absolute', top: 50, right: 20, zIndex: 1 },
  cardContainer: { marginTop: 110, alignItems: 'center' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  number: { fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  label: { fontSize: 14, marginTop: 5 },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(130, 193, 255, 0.9)',
    width: '100%',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  navItem: {
    padding: 10,
    borderRadius: 10,
  },
  activeNav: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
});
