import 'package:app/data/source/service_locator.dart';
import 'package:app/presentation/screens/login_two.dart';
import 'package:app/presentation/screens/splashscreen.dart';
import 'package:app/utils/firebase_msg_handler.dart';
import 'package:flutter/material.dart';
import 'package:app/presentation/screens/home_screen.dart';
import 'package:app/presentation/screens/login.dart';
import 'package:app/presentation/theme/app_theme.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:app/utils/notification_permission.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Firebase
  await Firebase.initializeApp();

  // Register the background message handler
  FirebaseMessaging.onBackgroundMessage(firebaseMessagingBackgroundHandler);

  // Request notification permissions
  await requestNotificationPermissions();

  // Listen for foreground messages
  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    print('Received a message while in the foreground!');
    print('Message data: ${message.data}');

    if (message.notification != null) {
      print('Message also contained a notification: ${message.notification}');
    }
  });

  // Initialize Hive
  await initHiveForFlutter();

  // Setup service locator dependencie injection library
  await setupServiceLocator();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Swift Bank',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      initialRoute: '/',
      routes: {
        '/': (context) => const SplashScreen(),
        '/firstlogin': (context) => const LoginScreen(),
        '/login': (context) => const LoginScreenTwo(),
        '/home': (context) => const HomeScreen(),
      },
    );
  }
}
