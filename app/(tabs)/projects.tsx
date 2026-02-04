import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InteractiveListItem } from "../../components/InteractiveListItem";
import { COLORS } from "../../constants/theme";
import { storage } from "../../services/storage";
import { Project } from "../../types";

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  const loadProjects = async () => {
    const data = await storage.getProjects();
    setProjects(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadProjects();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InteractiveListItem
            title={item.name}
            subtitle={item.projectType || "Project"}
            icon="briefcase"
            onPress={() =>
              router.push({
                pathname: "/projects/[id]",
                params: { id: item.id },
              } as any)
            }
          />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.headerTitle}>All Projects</Text>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No projects found.</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/projects/add")}
      >
        <Ionicons name="add" size={30} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  list: {
    padding: 20,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
});
