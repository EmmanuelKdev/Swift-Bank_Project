import 'package:app/data/source/service_locator.dart';
import 'package:app/presentation/screens/login_two.dart';
import 'package:app/presentation/screens/splashscreen.dart';
import 'package:flutter/material.dart';
import 'package:app/presentation/screens/home_screen.dart';
import 'package:app/presentation/screens/login.dart';
import 'package:app/presentation/theme/app_theme.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

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
