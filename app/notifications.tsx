import React, { useState, useCallback } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, StyleSheet, RefreshControl, KeyboardAvoidingView, Platform, TouchableWithoutFeedback,  Keyboard, } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const NotificationsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Job Match",
      description: "A new job matched your profile.",
      image: "https://avatar.iran.liara.run/public/15",
      dateGroup: "Today",
      read: false,
      selected: false,
    },
    {
      id: "2",
      title: "Interview Reminder",
      description: "Don't forget your interview at 3 PM tomorrow.",
      image: "https://avatar.iran.liara.run/public/92",
      dateGroup: "Last Week",
      read: false,
      selected: false,
    },
    {
      id: "3",
      title: "Message from Career Coach",
      description: "Your coach sent you a message.",
      image: "https://avatar.iran.liara.run/public/42",
      dateGroup: "Last Week",
      read: false,
      selected: false,
    },
    {
      id: "4",
      title: "New Article Posted",
      description: "Check out the latest career advice article.",
      image: "https://avatar.iran.liara.run/public/27",
      dateGroup: "Last Month",
      read: true,
      selected: false,
    },
    {
      id: "5",
      title: "New Message",
      description: "You've received a message from a recruiter.",
      image: "https://avatar.iran.liara.run/public/13",
      dateGroup: "Last Month",
      read: true,
      selected: false,
    },
  ]);

  const [showUndoSnackbar, setShowUndoSnackbar] = useState(false);
  const [deletedNotification, setDeletedNotification] = useState<{
    id: string;
    title: string;
    description: string;
    image: string;
    dateGroup: string;
    read: boolean;
    selected: boolean;
  } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  const toggleReadStatus = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const deleteNotification = (id: string) => {
    const deleted = notifications.find((n) => n.id === id);
    if (deleted) setDeletedNotification(deleted);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setShowUndoSnackbar(true);
    setTimeout(() => setShowUndoSnackbar(false), 10000);
  };

  const undoDelete = () => {
    if (deletedNotification) {
      setNotifications((prev) => [...prev, deletedNotification]);
      setShowUndoSnackbar(false);
    }
  };

  const handleSearchChange = (text: string) => setSearchQuery(text);

  const handleSelectAll = () => {
    const newState = !allSelected;
    setAllSelected(newState);
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, selected: newState }))
    );
  };

  const openDropdown = () => setDropdownVisible((prev) => !prev);

  const markAllAs = (status: "read" | "unread") => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.selected ? { ...n, read: status === "read", selected: false } : n
      )
    );
    setDropdownVisible(false);
    setAllSelected(false);
  };

  const cancelSelection = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, selected: false }))
    );
    setDropdownVisible(false);
    setAllSelected(false);
  };

  const filteredNotifications = notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadNotifications = filteredNotifications.filter((n) => !n.read);
  const readNotifications = filteredNotifications.filter((n) => n.read);

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteNotification(id)}
    >
      <Text style={styles.deleteText}>DELETE</Text>
    </TouchableOpacity>
  );

  const renderNotificationItem = (item: typeof notifications[0], isRead: boolean) => (
    <Swipeable key={item.id} renderRightActions={() => renderRightActions(item.id)}>
      <View
        style={[
          styles.notificationContainer,
          item.selected && styles.selectedContainer,
          {
            backgroundColor: item.selected
              ? "#e2f0fb"
              : isRead
              ? "#f0f0f0"
              : "#ffffff",
          },
        ]}
      >
        {!isRead && <View style={styles.unreadDot} />}
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={{ marginLeft: 16, flex: 1 }}>
          <Text style={[styles.title, isRead && styles.readTitle]}>{item.title}</Text>
          <Text style={[styles.description, isRead && styles.readDescription]}>
            {item.description}
          </Text>
        </View>
        <TouchableOpacity onPress={() => toggleReadStatus(item.id)}>
          <Text style={{ color: "blue", paddingTop: 10 }}>
            {isRead ? "Mark as Unread" : "Mark as Read"}
          </Text>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => dropdownVisible && setDropdownVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ backgroundColor: "#f5f5f5" }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search notifications"
                placeholderTextColor="#444"
                value={searchQuery}
                onChangeText={handleSearchChange}
              />
            </View>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={handleSelectAll}
            >
              <MaterialIcons
                name={allSelected ? "check-box" : "check-box-outline-blank"}
                size={24}
                color="#444"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={openDropdown}>
              <MaterialIcons name="arrow-drop-down" size={30} color="#444" />
            </TouchableOpacity>
          </View>

          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity onPress={() => markAllAs("read")} style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Read</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => markAllAs("unread")} style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Unread</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelSelection} style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.sectionHeader}>Unread Notifications</Text>
          {unreadNotifications.length === 0 ? (
            <Text style={styles.emptyText}>No unread notifications</Text>
          ) : (
            unreadNotifications.map((item) => renderNotificationItem(item, false))
          )}

          <Text style={styles.sectionHeader}>Read Notifications</Text>
          {readNotifications.length === 0 ? (
            <Text style={styles.emptyText}>No read notifications</Text>
          ) : (
            readNotifications.map((item) => renderNotificationItem(item, true))
          )}

          {showUndoSnackbar && (
            <View style={styles.snackbar}>
              <Text style={styles.snackbarText}>Notification deleted</Text>
              <TouchableOpacity onPress={undoDelete}>
                <Text style={styles.undoText}>Undo</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF0000",
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    color: "#333",
    fontSize: 14,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    marginLeft: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    flex: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedContainer: {
    backgroundColor: "#e0f0ff",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  snackbar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  snackbarText: {
    color: "#fff",
    fontSize: 16,
  },
  undoText: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginVertical: 16,
  },
  readDescription: {
    color: "#888",
    textDecorationLine: "line-through",
  },
  readTitle: {
    color: "#888",
    textDecorationLine: "line-through",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  dropdownMenu: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    zIndex: 999,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
});
