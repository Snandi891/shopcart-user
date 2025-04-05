import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";

const RemoveWishlist = ({ item, onAddToCart, onRemoveFromWishlist }) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <ScrollView>
        <View
          style={{
            backgroundColor: "#fff",
            // padding: 10,
            paddingHorizontal: 50,
            borderRadius: 10,
            paddingBottom: 10,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            elevation: 5,
            margin: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              gap: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{ uri: item?.images[0] }}
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
                marginTop: 10,
                borderRadius: 20,
                backgroundColor: "#fff",
                alignSelf: "center",
                elevation: 10,
                shadowColor: "cyan",
              }}
            />
            <View style={{ gap: 10, paddingTop: 10 }}>
              <Text
                numberOfLines={2}
                style={{
                  numberOfLines: 0.1,
                  ellipsizeMode: "tail",
                  maxWidth: 200,
                  fontSize: 15,
                }}
              >
                Name : {item.title}
              </Text>

              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Price : {" ₹ " + item.price}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              gap: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 10,
                padding: 10,
                backgroundColor: "peru",
                marginTop: 20,
                elevation: 10,
              }}
              onPress={() => {
                onRemoveFromWishlist();
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>remove</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onAddToCart(item);
              }}
              style={{
                borderRadius: 10,
                padding: 10,
                backgroundColor: "lime",
                marginTop: 20,
                elevation: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RemoveWishlist;
