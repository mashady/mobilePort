import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GradientProfileCard } from "../../components/GradientProfileCard";
import { InteractiveListItem } from "../../components/InteractiveListItem";
import { QuickActionButton } from "../../components/QuickActionButton";
import { COLORS } from "../../constants/theme";
import { storage } from "../../services/storage";
import { Post, Project } from "../../types";

export default function DashboardScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  const loadData = async () => {
    const [projectsData, postsData] = await Promise.all([
      storage.getProjects(),
      storage.getPosts(),
    ]);
    setProjects(projectsData.slice(0, 3)); // Show only recent 3
    setPosts(postsData.slice(0, 3)); // Show only recent 3
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <GradientProfileCard
          name="Mashady"
          role="Full Stack Developer"
          stats={[
            { label: "Projects", value: "12" },
            { label: "Posts", value: "48" },
          ]}
        />

        <View style={styles.actionRow}>
          <QuickActionButton
            icon="add-circle"
            label="Proj"
            onPress={() => router.push("/projects/add")}
          />
          <QuickActionButton
            icon="newspaper"
            label="Post"
            onPress={() => router.push("/posts/add")}
          />
          <QuickActionButton
            icon="code-slash"
            label="Skill"
            onPress={() => router.push("/skills/add")}
          />
          <QuickActionButton
            icon="settings-outline"
            label="Settings"
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Projects</Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/projects" as any)}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {projects.map((item) => (
            <InteractiveListItem
              key={item.id}
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
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Posts</Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/posts" as any)}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {posts.map((item) => (
            <InteractiveListItem
              key={item.id}
              title={item.title}
              subtitle={item.createdAt}
              icon="newspaper"
              onPress={() =>
                router.push({
                  pathname: "/posts/[id]",
                  params: { id: item.id },
                } as any)
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },
});
