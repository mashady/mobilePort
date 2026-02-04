import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, GRADIENTS } from "../constants/theme";

interface GradientProfileCardProps {
  name: string;
  role: string;
  stats?: { label: string; value: string }[];
}

export const GradientProfileCard: React.FC<GradientProfileCardProps> = ({
  name,
  role,
  stats = [],
}) => {
  return (
    <LinearGradient
      colors={GRADIENTS.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <LinearGradient colors={["#A886FF", "#8257FF"]} style={styles.badge}>
          <Text style={styles.badgeText}>PRO</Text>
        </LinearGradient>
      </View>

      <View style={styles.mainContent}>
        <Text style={styles.roleLabel}>{role}</Text>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <View style={styles.footerIconContainer}>
            <Ionicons name="briefcase" size={16} color={COLORS.white} />
          </View>
          <View>
            <Text style={styles.footerLabel}>Projects</Text>
            <Text style={styles.footerValue}>12 Active</Text>
          </View>
        </View>
        <View style={styles.footerSeparator} />
        <View style={styles.footerItem}>
          <View style={styles.footerIconContainer}>
            <Ionicons name="star" size={16} color={COLORS.white} />
          </View>
          <View>
            <Text style={styles.footerLabel}>Skills</Text>
            <Text style={styles.footerValue}>24 Mastered</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 24,
    width: "100%",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileInfo: {
    flex: 1,
  },
  welcomeText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    marginBottom: 4,
  },
  nameText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  mainContent: {
    marginBottom: 24,
  },
  roleLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  footerItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  footerIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  footerLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
  },
  footerValue: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  footerSeparator: {
    width: 1,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 12,
  },
});
