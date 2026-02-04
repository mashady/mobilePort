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
import { Skill } from "../../types";

export default function SkillsScreen() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const router = useRouter();

  const loadSkills = async () => {
    const data = await storage.getSkills();
    setSkills(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadSkills();
    }, []),
  );

  const handleDelete = async (id: string) => {
    const updated = skills.filter((s) => s.id !== id);
    await storage.saveSkills(updated);
    setSkills(updated);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={skills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <InteractiveListItem
              title={item.name}
              subtitle={item.type}
              icon="code-slash"
              onPress={() => {}}
            />
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              style={styles.deleteBtn}
            >
              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.headerTitle}>Expertise</Text>}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No skills found.</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/skills/add")}
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
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  deleteBtn: {
    padding: 10,
    marginLeft: 10,
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
