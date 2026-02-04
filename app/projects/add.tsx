import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet
} from "react-native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { COLORS, SPACING } from "../../constants/theme";
import { storage } from "../../services/storage";
import { Project } from "../../types";

export default function AddProjectScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [projectType, setProjectType] = useState<
    "Frontend" | "Backend" | "Full Stack"
  >("Frontend");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!name || !description) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const projects = await storage.getProjects();
      const newProject: Project = {
        id: Math.random().toString(36).substr(2, 9), // Simple ID generator for now
        name,
        description,
        cover,
        projectType,
      };
      await storage.saveProjects([...projects, newProject]);
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Input
          label="Project Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter project name"
        />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter project description"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <Input
          label="Cover Image URL"
          value={cover}
          onChangeText={setCover}
          placeholder="Enter image URL"
        />
        <Button
          title="Save Project"
          onPress={handleSave}
          loading={loading}
          style={styles.button}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.main,
  },
  scroll: {
    padding: SPACING.md,
  },
  button: {
    marginTop: SPACING.lg,
  },
});
