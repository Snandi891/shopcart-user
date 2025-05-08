import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const RemoveCart = ({ item, onRemoveItem, onAddToCart }) => {
  const [showModel, setShowModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const postApiUrl = " https://project-x-five-smoky.vercel.app/api/cart";
  const [responseMessage, setResponseMessage] = useState("");

  const sendPostRequest = async () => {
    try {
      const data = {
        title: item.title,
        description: item.description,
        price: item.price,
        images: item.images[0],
      };

      const response = await fetch(postApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_TOKEN", // If required
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setResponseMessage(JSON.stringify(result));

      // showTost();

      console.log("POST Success:", result);
      alert("order Placed");
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error in sending request");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        padding: moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView>
        <View
          style={{
            backgroundColor: "#fff",
            // padding: moderateScale(10),
            paddingHorizontal: 20,
            borderRadius: moderateScale(10),
            paddingBottom: moderateScale(10),
            shadowColor: "#000",
            shadowOpacity: 0.3,
            elevation: 5,
            margin: moderateScale(10),
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
                resizeMode: "cover",
                marginTop: moderateScale(7),
                borderRadius: 20,
                backgroundColor: "#fff",
                alignSelf: "center",
                elevation: 10,
                shadowColor: "cyan",
              }}
            />
            <View style={{ gap: 10, paddingTop: moderateScale(10) }}>
              <Text
                numberOfLines={2}
                style={{
                  numberOfLines: 0.1,
                  ellipsizeMode: "tail",
                  maxWidth: 200,
                  fontSize: moderateScale(15),
                }}
              >
                Name : {item.title}
              </Text>

              <Text style={{ fontSize: moderateScale(20), fontWeight: "bold" }}>
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
                borderRadius: moderateScale(10),
                padding: moderateScale(10),
                backgroundColor: "peru",
                marginTop: moderateScale(20),
                elevation: 10,
              }}
              onPress={() => {
                onRemoveItem();
              }}
            >
              <Text style={{ fontSize: moderateScale(20), fontWeight: "bold" }}>
                remove
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onAddToCart(item);
              }}
              style={{
                borderRadius: moderateScale(10),
                padding: moderateScale(10),
                backgroundColor: "lime",
                marginTop: moderateScale(20),
                elevation: 10,
              }}
            >
              <Text style={{ fontSize: moderateScale(20), fontWeight: "bold" }}>
                Recart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* <TouchableOpacity
        style={{
          padding: moderateScale(10),
          backgroundColor: "green",
          borderRadius: 20,
        }}
        onPress={() => {
          sendPostRequest();
        }}
      >
        <Text>book</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default RemoveCart;
