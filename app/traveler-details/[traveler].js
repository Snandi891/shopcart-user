import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import * as ScreenCapture from "expo-screen-capture";
import TravelerBusiness from "../../components/Home/TravelerBusiness";
import LottieView from "lottie-react-native";

const TravelerDetails = () => {
  const { traveler } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👇 Block screenshots on mount, allow on unmount
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  const fetchTravelerProducts = async () => {
    const endpoints = [
      "https://project-x-five-smoky.vercel.app/api/banner",
      "https://project-x-five-smoky.vercel.app/api/shirt",
      "https://project-x-five-smoky.vercel.app/api/jins",
      "https://project-x-five-smoky.vercel.app/api/phone",
      "https://project-x-five-smoky.vercel.app/api/laptop",
      "https://project-x-five-smoky.vercel.app/api/products",
    ];

    try {
      const requests = endpoints.map((url) =>
        axios.get(`${url}?traveler=${encodeURIComponent(traveler)}`)
      );
      const responses = await Promise.all(requests);

      // Combine and flatten all responses
      const combinedProducts = responses.flatMap((res) => res.data);

      setProducts(combinedProducts);
    } catch (error) {
      console.error("Error fetching traveler products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravelerProducts();
  }, [traveler]);

  if (loading) {
    return (
      <LottieView
        source={require("../../animation/Animation - 1746197477833.json")}
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
          marginTop: "50%",
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Travels by this traveler : {traveler}
      </Text>

      {products.length === 0 ? (
        <Text>---- No traveler avalable ----.</Text>
      ) : (
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <TravelerBusiness item={item} />}
        />
      )}
    </View>
  );
};

export default TravelerDetails;
