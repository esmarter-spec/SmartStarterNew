import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function KidsPScreen({ navigation }) {
  const screenWidth = Dimensions.get('window').width;
  const [selectedCategory, setSelectedCategory] = useState('Alphabets');

  // Data for different categories
  const chartData = {
    Alphabets: {
      labels: ['Interest', 'Learning Process', 'Speed'],
      datasets: [
        {
          data: [7, 11, 16],
          colors: [
            () => '#FFEB3B', // yellow
            () => '#F44336', // red
            () => '#FFB74D', // orange
          ],
        },
      ],
    },
    Numbers: {
      labels: ['Interest', 'Learning Process', 'Speed'],
      datasets: [
        {
          data: [9, 13, 14],
          colors: [
            () => '#FFEB3B',
            () => '#F44336',
            () => '#FFB74D',
          ],
        },
      ],
    },
    Shapes: {
      labels: ['Interest', 'Learning Process', 'Speed'],
      datasets: [
        {
          data: [6, 10, 15],
          colors: [
            () => '#FFEB3B',
            () => '#F44336',
            () => '#FFB74D',
          ],
        },
      ],
    },
    Animals: {
      labels: ['Interest', 'Learning Process', 'Speed'],
      datasets: [
        {
          data: [8, 12, 13],
          colors: [
            () => '#FFEB3B',
            () => '#F44336',
            () => '#FFB74D',
          ],
        },
      ],
    },
  };

  const data = chartData[selectedCategory];

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsButton}>
        <Image
          source={require('../assets/settings.png')}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>

      {/* Banner Kids Image */}
      <Image
        source={require('../assets/KidsP.png')}
        style={styles.bannerImage}
        resizeMode="contain"
      />

      {/* Category Subtitle */}
      <Text style={styles.subTitle}>{selectedCategory}</Text>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: '#FFEB3B' }]} />
          <Text style={styles.legendText}>Interest</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: '#F44336' }]} />
          <Text style={styles.legendText}>Learning Process</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: '#FFB74D' }]} />
          <Text style={styles.legendText}>Speed</Text>
        </View>
      </View>

      {/* Bar Chart - TRANSPARENT BACKGROUND */}
      <BarChart
        data={data}
        width={screenWidth - 7}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#4DA6FF', // SAME SA MAIN BACKGROUND
          backgroundGradientTo: '#4DA6FF', // SAME SA MAIN BACKGROUND
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: () => '#000',
          barPercentage: 0.8,
          propsForLabels: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}
        fromZero
        withCustomBarColorFromData
        flatColor
        style={styles.chartStyle}
        showValuesOnTopOfBars={false}
      />

      {/* Bottom Buttons (Grid 2x2) */}
      <View style={styles.buttonContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={[
              styles.navButton,
              selectedCategory === 'Alphabets' && styles.navButtonActive,
            ]}
            onPress={() => setSelectedCategory('Alphabets')}
          >
            <Text style={styles.navText}>Alphabets</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              selectedCategory === 'Numbers' && styles.navButtonActive,
            ]}
            onPress={() => setSelectedCategory('Numbers')}
          >
            <Text style={styles.navText}>Numbers</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={[
              styles.navButton,
              selectedCategory === 'Shapes' && styles.navButtonActive,
            ]}
            onPress={() => setSelectedCategory('Shapes')}
          >
            <Text style={styles.navText}>Shapes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              selectedCategory === 'Animals' && styles.navButtonActive,
            ]}
            onPress={() => setSelectedCategory('Animals')}
          >
            <Text style={styles.navText}>Animals</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4DA6FF',
    paddingTop: 40,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#003366',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    zIndex: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  settingsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  settingsIcon: {
    width: 35,
    height: 35,
    tintColor: '#000000',
  },
  bannerImage: {
    width: '100%',
    height:190,
    marginTop: 60,
    resizeMode: 'contain',
  },
  // Sa part ng styles, i-update mo ang subTitle:

subTitle: {
  fontSize: 34,
  fontWeight: 'bold',
  fontStyle: 'italic',
  color: '#fff',
  marginBottom: 5,
  marginTop: -10,
  textShadowColor: '#000',            // dark shadow
  textShadowOffset: { width: 3, height: 3 }, // more depth
  textShadowRadius: 6,                // blur for softer edges
  letterSpacing: 1,                   // cleaner spacing
},

  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  legendBox: {
    width: 8,
    height: 8,
    marginRight: 4,
  },
  legendText: {
    fontSize: 10,
    color: '#000',
    fontWeight: '600',
  },
  chartStyle: {
    marginVertical: 10,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  navButton: {
    backgroundColor: '#003366',
    paddingVertical: 10,
    borderRadius: 30,
    width: '48%',
    alignItems: 'center',
  },
  navButtonActive: {
    backgroundColor: '#64B5F6',
  },
  navText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});