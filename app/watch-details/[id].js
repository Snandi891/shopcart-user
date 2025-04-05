import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import AnimatedTost from "../../animated/AnimatedTost";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../components/redux/actions/Actions";

const watchdata = () => {
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  // console.log("Product Id", id);

  const [product, setProduct] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios
        .get(`https://project-x-five-smoky.vercel.app/api/watch?id=${id}`)
        .then((response) => {
          setProduct(response.data);
          // console.log(response.data);
        });
    }
  }, [id]);

  const router = useRouter();

  const updateModel = (product) => {
    setShowModel(true);
    setSelectedUser(product);
  };

  return (
    <ScrollView>
      <View>
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
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-circle-sharp" size={34} color="black" />
          </TouchableOpacity>
          <Ionicons name="heart-outline" size={34} color="black" />
        </View>
        <Image
          source={{ uri: product?.images[0] }}
          style={{
            width: "100%",
            height: 250,
            backgroundColor: "#fff",
            resizeMode: "contain",
            marginBottom: 30,
          }}
        />

        <View
          style={{
            padding: 15,
            backgroundColor: "#fff",
            marginTop: -20,
            borderRadius: 25,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 15.5, fontWeight: "700" }}>
            {product?.title}
          </Text>
          <View
            style={{ paddingTop: 10, display: "flex", flexDirection: "row" }}
          >
            <Text
              style={{
                fontSize: 19,
                paddingTop: 7,
                fontWeight: "600",
              }}
            >
              Original Price :
            </Text>
            <Text
              style={{
                fontSize: 19,
                paddingTop: 7,
                fontWeight: "800",
                color: "green",
              }}
            >
              {"  " + product?.gender}
            </Text>
          </View>
          <View
            style={{ paddingTop: 10, display: "flex", flexDirection: "row" }}
          >
            <Text
              style={{
                fontSize: 20,
                paddingTop: 7,
                fontWeight: "600",
              }}
            >
              Limited Offer :
            </Text>
            <Text
              style={{
                fontSize: 19,
                paddingTop: 7,
                fontWeight: "800",
                color: "red",
              }}
            >
              {"   " + product?.price}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                paddingTop: 9,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../Images/star.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "600",
                  paddingLeft: 10,
                  color: "green",
                }}
              >
                4.5
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  paddingLeft: 10,
                }}
              >
                Saller rattings
              </Text>
            </View>
          </View>

          <Text style={{ paddingTop: 20, fontSize: 20, fontWeight: "600" }}>
            Product Highlight
          </Text>
          <Text style={{ paddingTop: 10, marginBottom: 20, fontSize: 20 }}>
            {product?.short}
          </Text>

          <View
            style={{
              paddingTop: 10,
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
              padding: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "orange",
                justifyContent: "center",
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => updateModel(product)}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Buy Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                dispatch(addItemToCart(product));
              }}
            >
              <Image
                source={require("./../../Images/whatsap.png")}
                style={{ height: 50, width: 50, paddingRight: 10 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 16, paddingBottom: 10 }}>
            All Details
          </Text>
          <Text style={{ color: "dimgrey", fontSize: 15 }}>
            {product?.description}
          </Text>
        </View>
        <Modal visible={showModel} transparent={true}>
          <UserModel setShowModel={setShowModel} selectedUser={selectedUser} />
        </Modal>
      </View>
    </ScrollView>
  );
};

const UserModel = (props) => {
  const [visible, setVisible] = useState(false);
  const showTost = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  const postApiUrl = "https://project-x-five-smoky.vercel.app/api/order";
  const [responseMessage, setResponseMessage] = useState("");

  const [selectedSize, setSelectedSize] = useState(null);

  const sizes = ["Brown", "black"];

  const handleSizeSelect = (big) => {
    setSelectedSize(big);
  };

  const sendPostRequest = async () => {
    try {
      const data = {
        title: props.selectedUser.title,
        description: props.selectedUser.description,
        price: props.selectedUser.price,
        big: selectedSize,
        images: props.selectedUser.images[0],
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

      setTimeout(() => {
        props.setShowModel(false);
      }, 3000);

      // showTost();

      // console.log("POST Success:", result);
      // alert("order Placed");
    } catch (error) {
      // console.error("Error:", error);
      setResponseMessage("Error in sending request");
    }
  };

  // console.warn(props.selectedUser);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BlurView
        intensity={140}
        tint="systemUltraThinMaterialDark"
        style={{
          flex: 1,
          textAlign: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            elevation: 5,
            margin: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              gap: 15,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{ uri: props.selectedUser.images[0] }}
              style={{
                width: 120,
                height: 160,
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
                Name : {props.selectedUser.title}
              </Text>

              <Text style={{ fontSize: 15 }}>Choose color</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ gap: 2 }}
              >
                {sizes.map((big) => (
                  <TouchableOpacity
                    key={big}
                    onPress={() => handleSizeSelect(big)}
                    style={{
                      padding: 5,
                      margin: 5,
                      // flexDirection: "row",
                      backgroundColor: selectedSize === big ? "blue" : "gray",
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      {big}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Price : {" ₹ " + props.selectedUser.price}
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
              onPress={() => props.setShowModel(false)}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Close Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                sendPostRequest();
                showTost();
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
      </BlurView>
      <AnimatedTost
        visible={visible}
        type={"SUCSESS"}
        message={"Order Placed"}
      />
    </View>
  );
};

export default watchdata;
