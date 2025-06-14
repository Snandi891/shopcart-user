import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  FlatList,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import * as ScreenCapture from "expo-screen-capture";

export default function App() {
  const [locationName, setLocationName] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // 👇 Block screenshots on mount, allow on unmount
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  const API_KEY = "32f53d4f1297c217a7e047a4af2a2ef0";

  const getGradientColors = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return ["#fbc2eb", "#a6c1ee"];
      case "Clouds":
        return ["#d7d2cc", "#304352"];
      case "Rain":
        return ["#4e54c8", "#8f94fb"];
      case "Thunderstorm":
        return ["#373B44", "#4286f4"];
      case "Snow":
        return ["#e0eafc", "#cfdef3"];
      case "Drizzle":
        return ["#89f7fe", "#66a6ff"];
      case "Mist":
      case "Fog":
        return ["#3e5151", "#decba4"];
      default:
        return ["#4c669f", "#3b5998", "#192f6a"];
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      setForecastData(data.list);
      setWeather(
        data.city && {
          name: data.city.name,
          weather: [data.list[0].weather[0]],
          main: data.list[0].main,
          wind: data.list[0].wind,
          coord: data.city.coord,
          pop: data.list[0].pop || 0,
        }
      );
      setLocationName(data.city?.name);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      Alert.alert("Error", "Could not fetch weather data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required.");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      fetchWeatherByCoords(latitude, longitude);
    })();
  }, []);

  const fetchWeatherByCity = async (city) => {
    Keyboard.dismiss();
    setLoading(true);
    setForecastLoading(true);
    setSearchText("");
    setSuggestions([]);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod !== "200") {
        Alert.alert("City not found");
        setLoading(false);
        return;
      }

      setForecastData(data.list);
      setWeather(
        data.city && {
          name: data.city.name,
          weather: [data.list[0].weather[0]],
          main: data.list[0].main,
          wind: data.list[0].wind,
          coord: data.city.coord,
          pop: data.list[0].pop || 0,
        }
      );
      setLocationName(data.city.name);
    } catch (error) {
      console.error("City fetch error:", error);
      Alert.alert("Error fetching city weather.");
    }
    setLoading(false);
    setForecastLoading(false);
  };

  const fetchCitySuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data.map((item) => `${item.name}, ${item.country}`));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const iconCode = weather?.weather?.[0]?.icon || "01d";
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  const weatherMain = weather?.weather?.[0]?.main || "Clear";
  const backgroundColors = getGradientColors(weatherMain);

  return (
    <LinearGradient colors={backgroundColors} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search city..."
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              fetchCitySuggestions(text);
            }}
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity onPress={() => fetchWeatherByCity(searchText)}>
            <Feather name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.gpsButton}
          onPress={async () => {
            let location = await Location.getCurrentPositionAsync({});
            fetchWeatherByCoords(
              location.coords.latitude,
              location.coords.longitude
            );
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../Images/weather.png")}
              style={{ height: 50, width: 50 }}
            />
            <Text style={styles.gpsButtonText}> Use Current Location</Text>
          </View>
        </TouchableOpacity>

        {suggestions.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => fetchWeatherByCity(suggestion)}
            style={styles.suggestion}
          >
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </TouchableOpacity>
        ))}

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 20 }}
          />
        ) : (
          <View style={styles.weatherContainer}>
            <Text style={styles.cityText}>{locationName}</Text>
            <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
            <Text style={styles.tempText}>
              {weather?.main?.temp
                ? `${Math.round(weather.main.temp)}°C`
                : "--"}
            </Text>
            <Text style={styles.descText}>
              {weather?.weather?.[0]?.description || "--"}
            </Text>

            <Text style={styles.infoText}>
              Wind: {weather?.wind?.speed || 0} m/s | Humidity:{" "}
              {weather?.main?.humidity || 0}% | Rain:{" "}
              {Math.round((weather?.pop || 0) * 100)}%
            </Text>
          </View>
        )}

        <Text style={styles.forecastTitle}>5-Day / 3-Hour Forecast</Text>

        {forecastLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <FlatList
            data={forecastData}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
            renderItem={({ item }) => {
              const time = new Date(item.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              const icon = item.weather?.[0]?.icon || "01d";
              return (
                <View style={styles.forecastCard}>
                  <Text style={styles.forecastTime}>{time}</Text>
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
                    }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.forecastTemp}>
                    {Math.round(item.main.temp)}°C
                  </Text>
                  <Text style={styles.rainText}>
                    💧 {Math.round((item.pop || 0) * 100)}%
                  </Text>
                </View>
              );
            }}
          />
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 60,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff20",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#fff",
    marginRight: 10,
  },
  gpsButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff30",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  gpsButtonText: {
    color: "#fff",
    fontSize: 18,
    paddingTop: 10,
    justifyContent: "center",
  },
  suggestion: {
    backgroundColor: "#ffffff30",
    padding: 8,
    borderRadius: 8,
    marginVertical: 2,
  },
  suggestionText: {
    color: "#fff",
  },
  weatherContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  cityText: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
  },
  weatherIcon: {
    width: 120,
    height: 120,
  },
  tempText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  descText: {
    fontSize: 18,
    color: "#eee",
    textTransform: "capitalize",
  },
  infoText: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 5,
    textAlign: "center",
    paddingBottom: 10,
  },
  forecastTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  forecastCard: {
    backgroundColor: "#ffffff20",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    width: 80,
  },
  forecastTime: {
    color: "#fff",
    fontSize: 14,
  },
  forecastTemp: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  rainText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});
