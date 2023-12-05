import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { useAuth } from "../context/UserContext";
import CustomButton from "../components/CustomButton";
const ProfileScreen = () => {
  const { user, signOut, refresh } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{user?.username || "Username"}</Text>
        <Text style={styles.infos}>Pays : {user?.my_country || "Country"}</Text>
        <Text style={styles.infos}>Hits : {user?.totalhits || "0"}</Text>
        <Text style={styles.infos}>
          Billets entrés : {user?.totalbills || "0"}
        </Text>
        <Text style={styles.infos}>
          Dernier biller entré : {user?.totalbills || "0"}
        </Text>
      </View>
      <Text style={styles.label}>classement</Text>
      <View style={{ flex: 1, justifyContent: "flex-end", gap: 15 }}>
        <CustomButton text="Se déconnecter" onPress={signOut} />
        <CustomButton text="rafraîchir" onPress={refresh} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FEF9EF",
    paddingHorizontal: 20,
    marginVertical: 90,
    gap: 15,
  },
  label: {
    alignSelf: "center",
    fontSize: 25,
  },
  infoContainer: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#FFCB77",
    elevation: 5,
    color: "#FEF9EF",
  },
  infos: {
    fontSize: 18,
    color: "#FEF9EF",
  },
});

export default ProfileScreen;
