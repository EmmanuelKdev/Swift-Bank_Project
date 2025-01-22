import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const sendPushNotification = async (
  token: string,
  title: string,
  body: string
) => {
  try {
    await admin.messaging().send({
      token,
      notification: {
        title,
        body,
      },
    });
  } catch (error) {
    console.error('Failed to send push notification:', error);
    throw new Error('Push notification failed');
  }
};