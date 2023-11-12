import { Text, View, Pressable, StyleSheet } from "react-native";
import { useAuth } from "../context/UserContext";
import { CustomButton } from "../components/CustomButton";

const ProfileScreen = () => {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{user?.username}</Text>
      </View>
      <View style={styles.flexRow}>
        <View style={styles.infoContainer}>
          <Text>Pays : {user?.my_country}</Text>
          <Text>Hits : {user?.totalhits}</Text>
          <Text>Billets entrés : {user?.totalbills}</Text>
          <Text>Dernier biller entré : {user?.totalbills}</Text>
        </View>
      </View>
      <Text style={styles.label}>Classment</Text>
      <View style={styles.flexRow}>
        <View style={styles.infoContainer}>
          <Text>Local : {/*TODO*/}</Text>
          <Text>National : {/*TODO*/}</Text>
          <Text>Mondial : {/*TODO*/}</Text>
        </View>
      </View>
      <Text style={styles.label}>Montant des billets</Text>
      <Text>Total : {/*TODO*/}</Text>
      <View style={styles.flexRow}>
        <View style={styles.infoContainer}>
          {/*TODO Composant qui affiche dans des barre le pourcentage de chaque billet*/}
        </View>
      </View>
      <CustomButton text="Se déconnecter" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  labelContainer: {
    marginTop: 35,
    marginBottom: 25,
  },
  label: {
    fontSize: 25,
  },
  infoContainer: {
    width: 100,
    padding: 8,
    borderWidth: 2,
    borderColor: "#383838",
    borderRadius: 5,
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
  },
});

export default ProfileScreen;
