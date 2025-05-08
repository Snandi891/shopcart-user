import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

const TravelerBusiness = ({ item }) => {
  return (
    <View>
      <Link href={`/travel-details/${item._id}`} asChild>
        <TouchableOpacity
          style={{
            marginBottom: 20,
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#ccc",
            backgroundColor: "white",
          }}
        >
          {item.images && item.images[0] ? (
            <Image
              source={{ uri: item.images[0] }}
              style={{ width: "100%", height: 200, borderRadius: 10 }}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                width: "100%",
                height: 200,
                backgroundColor: "#ddd",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No image available</Text>
            </View>
          )}

          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 10 }}>
            {item.title}
          </Text>

          <Text style={{ fontWeight: "bold", marginTop: 5 }}>
            Price: ${item.price}
          </Text>

          <Text style={{ color: "#888", marginTop: 5 }}>
            Traveler: {item.traveler}
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default TravelerBusiness;
