import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, addToWishlist } from "../redux/actions/Actions";
import BusinessName from "./BusinessName";

const Busness = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const URL = `https://project-x-five-smoky.vercel.app/api/products`;
    const response = await axios.get(URL);
    setProducts(response.data);
    setIsLoading(false);
  };

  return (
    <View style={{ padding: 10 }}>
      <View>
        <Text
          style={{
            marginTop: 1,
            fontSize: 20,
            fontWeight: "800",
          }}
        >
          Flash Sale
        </Text>
      </View>
      {/* <View
        style={{
          gap: 7,
          backgroundColor: "yellow",
          flexDirection: "row",
          paddingHorizontal: 8,
          marginTop: 10,
          paddingVertical: 5,
          borderRadius: 12,
          marginRight: 230,
        }}
      >
        <Ionicons name="time-outline" size={16} />
        <Text>00:00:00</Text>
      </View> */}
      <FlatList
        data={products}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ index, item }) => (
          <BusinessName
            item={item}
            onAddWishlist={(x) => {
              dispatch(addToWishlist(x));
            }}
            onAddToCart={(x) => {
              dispatch(addItemToCart(x));
            }}
          />
        )}
      />
    </View>
  );
};

export default Busness;

const styles = StyleSheet.create({});
