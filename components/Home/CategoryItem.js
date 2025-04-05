import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Card } from "react-native-shadow-cards";

const CategoryItem = () => {
  const router = useRouter();
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{}}
    >
      <TouchableOpacity onPress={() => router.push("/shirt-list/shirt-page")}>
        <Card
          style={{
            padding: 2,
            margin: 5,
            borderRadius: 10,
            height: 80,
            width: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../../Images/cloth.png")}
            style={{ height: 40, width: 40 }}
          />
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: 5,
            }}
          >
            Shirt
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/jins-list/jins-page")}>
        <Card
          style={{
            padding: 2,
            margin: 5,
            borderRadius: 10,
            height: 80,
            width: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../../Images/jeans.png")}
            style={{ height: 40, width: 40 }}
          />
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: 5,
            }}
          >
            Jeans
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/laptop-list/laptop-page")}>
        <Card
          style={{
            padding: 2,
            margin: 5,
            borderRadius: 10,
            height: 80,
            width: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../../Images/laptop.png")}
            style={{ height: 40, width: 40 }}
          />
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: 5,
            }}
          >
            Laptop
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/phone-list/phone-page")}>
        <Card
          style={{
            padding: 2,
            margin: 5,
            borderRadius: 10,
            height: 80,
            width: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../../Images/smartphone.png")}
            style={{ height: 40, width: 40 }}
          />
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: 5,
            }}
          >
            Phone
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/shoes-list/shoes-page")}>
        <Card
          style={{
            padding: 2,
            margin: 5,
            borderRadius: 10,
            height: 80,
            width: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../../Images/shoes.png")}
            style={{ height: 40, width: 40 }}
          />
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: 5,
            }}
          >
            Shoes
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/watch-list/watch-page")}>
        <Card
          style={{
            padding: 2,
            margin: 5,
            borderRadius: 10,
            height: 80,
            width: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../../Images/watch.png")}
            style={{ height: 40, width: 40 }}
          />
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: 5,
            }}
          >
            Watch
          </Text>
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CategoryItem;
