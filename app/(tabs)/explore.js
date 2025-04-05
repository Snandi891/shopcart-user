import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeFromWishlist,
} from "../../components/redux/actions/Actions";
import RemoveWishlist from "../../components/Home/RemoveWishlist";

const Wishlist = () => {
  const [cartList, setCartList] = useState([]);
  const wishData = useSelector((state) => state.Reducers2);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      {wishData.length > 0 ? (
        <FlatList
          data={wishData}
          renderItem={({ item, index }) => {
            return (
              <RemoveWishlist
                item={item}
                onRemoveFromWishlist={() => {
                  dispatch(removeFromWishlist(index));
                }}
                onAddToCart={(x) => {
                  dispatch(addItemToCart(x));
                }}
              />
            );
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Items Added into the wishlist</Text>
        </View>
      )}
    </View>
  );
};

export default Wishlist;
