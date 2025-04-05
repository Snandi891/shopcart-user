import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "expo-router";

const WatchBusiness = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setIsLoading(true);
    const URL = `https://project-x-five-smoky.vercel.app/api/watch`;
    const response = await axios.get(URL);
    setProducts(response.data);
    setIsLoading(false);
  };

  return (
    <View>
      {products?.length > 0 && isLoading == false ? (
        <FlatList
          data={products}
          renderItem={({ index, item }) => (
            <Link href={`/watch-details/${item._id}`} asChild>
              <TouchableOpacity
                style={{
                  padding: 10,
                  margin: 10,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <View
                  style={{
                    width: 163,
                    height: 160,
                    borderRadius: 19,

                    //   backgroundColor: "#f0ffff",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item?.images[0] }}
                    style={{
                      width: "130",
                      height: "100%",
                      resizeMode: "contain",
                    }}
                  />
                </View>

                <View style={{ gap: 7, flex: 1 }}>
                  <Text style={{ fontWeight: "800", fontSize: 16 }}>
                    {item.title}
                  </Text>
                  <Text style={{}}>{"Price : " + item.price}</Text>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        paddingTop: 10,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        source={require("../../Images/star.png")}
                        style={{ width: 15, height: 15 }}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "600",
                          paddingLeft: 10,
                          paddingBottom: 5,
                        }}
                      >
                        4.5
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontFamily: "outfit",
                      backgroundColor: "green",
                      padding: 10,
                      textAlign: "center",
                      color: "#fff",
                      fontSize: 15,
                      borderRadius: 15,
                    }}
                  >
                    Buy Now
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          )}
        />
      ) : isLoading ? (
        <ActivityIndicator size={"large"} style={{ marginTop: "60%" }} />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            padding: 20,
            margin: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            No Product Found
          </Text>
        </View>
      )}
    </View>
  );
};

export default WatchBusiness;

const styles = StyleSheet.create({});
