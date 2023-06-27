import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Notifications = () => {
    async function sendLocalNotification(delay: number) {
        const title = "Hey User";
        const body = "First Notification";
      
        /*Notifications.scheduleNotificationAsync({
          content: {
            title: title,
            body: body,
            data: {
              name: "arun",
            },
          },
          trigger: {
            seconds: delay,
          },
        });*/
      }
      
  return (
    <View>
      <Text>Notifications</Text>
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({})