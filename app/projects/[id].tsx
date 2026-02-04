import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { COLORS, SPACING } from "../../constants/theme";
import { storage } from "../../services/storage";
import { Project } from "../../types";

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams();
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    const projects = await storage.getProjects();
    const found = projects.find((p: Project) => p.id === id);
    if (found) {
      setProject(found);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Project",
      "Are you sure you want to delete this project?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const projects = await storage.getProjects();
            const updated = projects.filter((p: Project) => p.id !== id);
            await storage.saveProjects(updated);
            router.back();
          },
        },
      ],
    );
  };

  if (!project) return null;

  return (
    <ScrollView style={styles.container}>
      {project.cover ? (
        <Image source={{ uri: project.cover }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.placeholderCover]}>
          <Ionicons name="image-outline" size={60} color={COLORS.typo} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.name}>{project.name}</Text>
        <Text style={styles.type}>
          {project.projectType || "General Project"}
        </Text>
        <Text style={styles.description}>{project.description}</Text>

        <View style={styles.actions}>
          <Button
            title="Delete Project"
            onPress={handleDelete}
            variant="danger"
            style={styles.deleteBtn}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.main,
  },
  cover: {
    width: "100%",
    height: 250,
    backgroundColor: COLORS.semiDark,
  },
  placeholderCover: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: SPACING.lg,
  },
  name: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  type: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  description: {
    color: COLORS.typo,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  actions: {
    marginTop: SPACING.xl,
  },
  deleteBtn: {
    marginTop: SPACING.md,
  },
});
