import { Text, View, Pressable, TextInput } from "react-native";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/UserContext";

type LoginScreenProps = {
  onPress: () => void;
};

type DataType = {
  email: string;
  password: string;
};

const LogInScreen = ({ onPress }: LoginScreenProps) => {
  const { control, handleSubmit } = useForm();
  const { signIn } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginHorizontal: 10 }}>
      <CustomInput
        name="email"
        placeholder="Email"
        control={control}
        rules={{
          required: "Veuillez entrez un email",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Veuillez entrez un email valide",
          },
        }}
      />
      <CustomInput
        name="password"
        placeholder="Mot de passe"
        control={control}
        secureTextEntry
        rules={{ required: "Veuillez entrez un mot de passe" }}
      />
      <Pressable onPress={handleSubmit(signIn)}>
        <Text>Log In</Text>
      </Pressable>
    </View>
  );
};

export default LogInScreen;
