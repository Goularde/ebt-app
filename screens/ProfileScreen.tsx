import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { useAuth } from "../context/UserContext";
import CustomButton from "../components/CustomButton";
const ProfileScreen = () => {
  const { user, signOut, refresh } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ gap: 60 }}>
        <View style={{ gap: 15 }}>
          <Text style={styles.label}>{user?.username || "Username"}</Text>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.infos}>
                Pays : {user?.my_country || "Country"}
              </Text>
              <Text style={styles.infos}>Hits : {user?.totalhits || "0"}</Text>
              <Text style={styles.infos}>
                Billets entrés : {user?.totalbills || "0"}
              </Text>
              {/* <Text style={styles.infos}>
          Dernier biller entré : {user?.totalbills || "0"}
        </Text> */}
            </View>
          </View>
        </View>
        <View style={{ gap: 15 }}>
          <CustomButton text="Se déconnecter" onPress={signOut} />
          <CustomButton text="rafraîchir" onPress={refresh} disabled />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FEF9EF",
  },
  label: {
    alignSelf: "center",
    fontSize: 25,
    // color: "#FEF9EF",
    fontWeight: "700",
  },
  infoContainer: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#FFCB77",
    elevation: 5,
    color: "#FEF9EF",
    gap: 15,
    marginHorizontal: 15,
  },
  infos: {
    fontSize: 18,
    color: "#FEF9EF",
  },
});

export default ProfileScreen;
