import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import TransactionList from "@/components/TransactionList";
import { colors, spacingY } from "@/constants/theme";
import { TransactionType } from "@/constants/types";
import { useAuth } from "@/contexts/authContext";
import useFetchData from "@/hooks/useFetchData";
import { useRouter } from "expo-router";
import { limit, where } from "firebase/firestore";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const SearchModal = () => {
  const { user, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");

  const constraints = [where("uid", "==", user?.uid), limit(30)];

  const {
    data: allTransactions,
    loading: transactionLoading,
    error,
  } = useFetchData<TransactionType>("transactions", constraints);

  const filteredTransactions = allTransactions.filter((item) => {
    if (search.length > 1) {
      if (
        item.category?.toLowerCase().includes(search.toLowerCase()) ||
        item.type?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
      ) {
        return true;
      }
      return false;
    }
    return true;
  });

  return (
    <ModalWrapper style={{ backgroundColor: colors.neutral900 }}>
      <View style={styles.container}>
        <Header
          title={"Search"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* form */}
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Input
              placeholder="shoes..."
              value={search}
              placeholderTextColor={colors.neutral400}
              containerStyle={{ backgroundColor: colors.neutral800 }}
              onChangeText={(value) => setSearch(value)}
            />
          </View>
          <View>
            <TransactionList
              loading={transactionLoading}
              data={filteredTransactions}
              emptyListMessage="No transactions found"
            />
          </View>
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
    // paddingVertical: spacingY._30,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
