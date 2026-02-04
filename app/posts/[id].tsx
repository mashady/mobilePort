import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { COLORS, SPACING } from "../../constants/theme";
import { storage } from "../../services/storage";
import { Post } from "../../types";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    const posts = await storage.getPosts();
    const found = posts.find((p: Post) => p.id === id);
    if (found) {
      setPost(found);
    }
  };

  const handleDelete = async () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const posts = await storage.getPosts();
          const updated = posts.filter((p: Post) => p.id !== id);
          await storage.savePosts(updated);
          router.back();
        },
      },
    ]);
  };

  if (!post) return null;

  return (
    <ScrollView style={styles.container}>
      {post.picture ? (
        <Image source={{ uri: post.picture }} style={styles.picture} />
      ) : (
        <View style={[styles.picture, styles.placeholderPicture]}>
          <Ionicons name="newspaper-outline" size={60} color={COLORS.typo} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.date}>{post.createdAt}</Text>
        <Text style={styles.description}>{post.description}</Text>

        <View style={styles.actions}>
          <Button
            title="Delete Post"
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
  picture: {
    width: "100%",
    height: 250,
    backgroundColor: COLORS.semiDark,
  },
  placeholderPicture: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    color: COLORS.typo,
    fontSize: 14,
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
