import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as Animatable from "react-native-animatable";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Animated from "react-native-reanimated";

const AnimatedBn = Animatable.createAnimatableComponent(TouchableOpacity);

const Width = Dimensions.get("window").width;

const BusinessName = ({ item, onAddToCart, onAddWishlist, index }) => {
  return (
    <Link href={`/product-details/${item._id}`} asChild>
      {/* source={{ uri: item?.images[0] }} */}

      <AnimatedBn
        style={{
          width: Width * 0.7,
          height: Width * 0.8,
          overflow: "hidden",
          borderRadius: 20,
          marginRight: moderateScale(20),
        }}
        animation={"slideInUp"}
        duration={1000 + (index + 1) * 100}
      >
        <View
          style={{
            position: "absolute",
            height: "100%",
            zIndex: 1,
            width: "100%",
            backgroundColor: "transparent",
            justifyContent: "space-between",
            padding: moderateScale(10),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onAddWishlist(item);
            }}
            style={{
              alignSelf: "flex-end",
              padding: moderateScale(5),
              backgroundColor: "black",
              borderRadius: moderateScale(50),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="heart-outline" size={34} color="#00ffff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onAddToCart(item);
            }}
            style={{
              alignSelf: "flex-end",
              padding: moderateScale(7),
              backgroundColor: "black",
              borderRadius: moderateScale(50),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome6 name="cart-shopping" size={24} color="#00ffff" />
          </TouchableOpacity>
          <View
            style={{
              padding: moderateScale(10),
              backgroundColor: "#edeff561",
              borderRadius: moderateScale(10),
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image
                source={require("../../Images/tag.png")}
                style={{ height: verticalScale(30), width: scale(30) }}
              />
              <Text
                style={{
                  fontSize: moderateScale(17),
                  color: "white",
                  fontWeight: "700",
                  marginLeft: moderateScale(10),
                  paddingTop: moderateScale(7),
                }}
              >
                {item?.title}
              </Text>
            </View>
            <Text
              numberOfLines={2}
              style={{
                color: "white",
                fontWeight: "400",
                marginLeft: moderateScale(10),
                paddingTop: moderateScale(5),

                numberOfLines: 0.1,
                ellipsizeMode: "tail",
                maxWidth: 200,
                fontSize: moderateScale(15),
              }}
            >
              {item?.short}
            </Text>
            <View
              style={{
                display: "flex",
                alignItems: "flex-end",
                paddingTop: 4,
              }}
            >
              <Text
                style={{
                  backgroundColor: "#00ffff",
                  padding: moderateScale(5),
                  borderRadius: 7,
                  color: "black",
                  fontWeight: "600",
                }}
              >
                {item?.price}
              </Text>
            </View>
          </View>
        </View>
        <Image
          source={{ uri: item?.images[0] }}
          style={{ width: "100%", height: "100%" }}
        />
      </AnimatedBn>
    </Link>
  );
};

export default BusinessName;
