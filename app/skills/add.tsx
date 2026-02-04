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
import { Skill } from "../../types";

export default function AddSkillScreen() {
  const [name, setName] = useState("");
  const [type, setType] = useState<"Frontend" | "Backend" | "Other">(
    "Frontend",
  );
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!name) {
      Alert.alert("Error", "Please fill in the skill name.");
      return;
    }

    setLoading(true);
    try {
      const skills = await storage.getSkills();
      const newSkill: Skill = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        type,
        imageUrl,
      };
      await storage.saveSkills([...skills, newSkill]);
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to save skill.");
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
          label="Skill Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter skill name"
        />
        <Input
          label="Type (Frontend, Backend, Other)"
          value={type}
          onChangeText={(text) => setType(text as any)}
          placeholder="Enter skill type"
        />
        <Input
          label="Icon URL"
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="Enter icon URL"
        />
        <Button
          title="Save Skill"
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
