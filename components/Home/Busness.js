import { FlatList, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItemToCart, addToWishlist } from "../redux/actions/Actions";
import BusinessName from "./BusinessName";
import * as Animatable from "react-native-animatable";
import CountdownTimer from "../../configs/CountdownTimer";
import { moderateScale } from "react-native-size-matters";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const Busness = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const URL = `https://project-x-five-smoky.vercel.app/api/products`;
      const response = await axios.get(URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ padding: moderateScale(2), marginTop: moderateScale(5) }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Animatable.View
          style={{ paddingBottom: moderateScale(10) }}
          animation={"slideInUp"}
          duration={2000}
        >
          <Text
            style={{
              fontSize: moderateScale(20),
              fontWeight: "700",
              paddingRight: moderateScale(7),
            }}
          >
            Flash offer - Ends On
          </Text>
        </Animatable.View>
        <View style={{ paddingRight: moderateScale(7) }}>
          <CountdownTimer />
        </View>
      </View>

      {isLoading ? (
        <LottieView
          source={require("../../animation/Animation - 1746201883317.json")}
          autoPlay
          loop
          style={{
            width: width * 0.5,
            height: width * 0.5,
            alignSelf: "center",
          }}
        />
      ) : products.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16 }}>
          Sorry sir,we updates soon
        </Text>
      ) : (
        <FlatList
          data={products}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ index, item }) => (
            <BusinessName
              item={item}
              index={index}
              onAddWishlist={(x) => dispatch(addToWishlist(x))}
              onAddToCart={(x) => dispatch(addItemToCart(x))}
            />
          )}
        />
      )}
    </View>
  );
};

export default Busness;

const styles = StyleSheet.create({});
