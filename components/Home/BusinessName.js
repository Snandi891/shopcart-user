import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

const BusinessName = ({ item, onAddToCart, onAddWishlist }) => {
  return (
    <Link href={`/product-details/${item._id}`} asChild>
      {/* source={{ uri: item?.images[0] }} */}

      <TouchableOpacity
        style={{
          marginVertical: 10,
        }}
      >
        <View
          style={{
            width: 263,
            height: 340,
            marginLeft: 10,
            backgroundColor: "white",
            borderRadius: 10,
            elevation: 6,
            marginRight: 5,
          }}
        >
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: item?.images[0] }}
              style={{
                width: 240,
                height: "90%",
                resizeMode: "contain",
                marginTop: 10,
                borderRadius: 20,
                backgroundColor: "#fff",
                alignSelf: "center",
              }}
            />
            <View
              style={{
                position: "absolute",
                zIndex: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                padding: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  onAddWishlist(item);
                }}
              >
                <Ionicons name="heart-outline" size={34} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ margin: 7, gap: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "600", marginLeft: 10 }}>
              {item.title}
            </Text>
            <Text style={{ paddingLeft: 10 }}>{"Price : " + item.price}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <View
              style={{
                paddingTop: 10,
                paddingLeft: 10,
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
            <TouchableOpacity
              onPress={() => {
                onAddToCart(item);
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  backgroundColor: "green",
                  padding: 10,
                  color: "#fff",
                  fontSize: 15,
                  borderRadius: 15,
                }}
              >
                Add To Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: "outfit",
                  backgroundColor: "green",
                  padding: 10,
                  color: "#fff",
                  fontSize: 15,
                  borderRadius: 15,
                }}
              >
                Buy Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default BusinessName;
