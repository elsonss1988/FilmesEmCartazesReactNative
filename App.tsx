import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";

export default function App() {
  type Props = {
    titulo: string;
    avatar: string;
  };

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Props[]>([]);

  useEffect(() => {
    const requestMovies = async () => {
      setLoading(true);
      const req = await fetch("https:api.b7web.com.br/cinema");
      const json = await req.json();

      if (json) {
        setMovies(json);
      }

      setLoading(false);
    };
    requestMovies();
  }, []);

  const handleLoadButton = async () => {
    const req = await fetch("https:api.b7web.com.br/cinema");
    const json = await req.json();

    if (json) {
      setMovies(json);
    }

    Alert.alert(
      "Update",
      "Pegou " + json.length + " filmes!",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("Ok Pressed") },
      ],
      { cancelable: false }
    );
    movies.forEach((i) => console.log(i));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Carregar Filmes" onPress={handleLoadButton} />
      {loading && (
        <View style={styles.loadingArea}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Carregando ...</Text>
        </View>
      )}

      {!loading && (
        <>
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
        </>
      )}
    </SafeAreaView>
  );
}
