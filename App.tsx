import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { styles } from "./styles";

export default function App() {
  type Props = {
    titulo: string;
    avatar: string;
  };

  const [movies, setMovies] = useState<Props[]>([]);

  const handleLoadButton = async () => {
    const req = await fetch("https:api.b7web.com.br/cinema");
    const json = await req.json();

    if (json) {
      setMovies(json);
    }

    Alert.alert("Update", "Pegou " + json.length + " filmes!");
    movies.forEach((i) => console.log(i));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Carregar Filmes" onPress={handleLoadButton} />
      <Text style={styles.totalMovieText}>
        {" "}
        Total de filmes: {movies.length}
      </Text>
      <FlatList
        style={styles.list}
        data={movies}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image
              source={{ uri: item.avatar }}
              style={styles.movieImage}
              resizeMode="contain"
            />
            <Text style={styles.movieTitle}>{item.titulo}</Text>
          </View>
        )}
        keyExtractor={(item) => item.titulo}
      />
    </SafeAreaView>
  );
}
