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
import { Post } from "../../types";

export default function AddPostScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const posts = await storage.getPosts();
      const newPost: Post = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        picture,
        createdAt: new Date().toLocaleDateString(),
      };
      await storage.savePosts([...posts, newPost]);
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to save post.");
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
          label="Post Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Enter post title"
        />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter post description"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
        <Input
          label="Picture URL"
          value={picture}
          onChangeText={setPicture}
          placeholder="Enter image URL"
        />
        <Button
          title="Save Post"
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
