// i want search oprion in react native by 4 api ,search bt place api 1- https://project-x-five-smoky.vercel.app/api/products , api 1- https://project-x-five-smoky.vercel.app/api/shirt, api 1- https://project-x-five-smoky.vercel.app/api/jins, api 1- https://project-x-five-smoky.vercel.app/api/laptop  and  make it clickable and route to  (<Link href={/product-details/${item._id}} asChild>)

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Link } from "expo-router";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define API endpoints
        const endpoints = [
          "https://project-x-five-smoky.vercel.app/api/products", // All products
          "https://project-x-five-smoky.vercel.app/api/shirt",
          "https://project-x-five-smoky.vercel.app/api/laptop",
          "https://project-x-five-smoky.vercel.app/api/jins",
        ];

        // Fetch all endpoints in parallel
        const responses = await Promise.all(
          endpoints.map((url) => axios.get(url))
        );

        // Combine all results into one array
        const allProducts = responses.flatMap((res) => res.data);

        // Filter by place
        const filtered = allProducts.filter((item) =>
          item.place?.toLowerCase().includes(searchText.toLowerCase())
        );

        console.log("Filtered Results:", filtered);
        setFilteredResults(filtered);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (searchText.length > 0) {
      fetchData();
    } else {
      setFilteredResults([]);
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by place..."
        style={styles.input}
        autoFocus={true}
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Link href={`/search-details/${item._id}`} asChild>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>Place: {item.place}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  item: {
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { fontWeight: "bold", fontSize: 16 },
  subtitle: { color: "#666" },
});
