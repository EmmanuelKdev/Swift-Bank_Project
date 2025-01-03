import 'dart:ffi';

import 'package:app/data/controllers/index.dart';
import 'package:app/data/source/secure_storage_utility.dart';
import 'package:app/data/source/session_manager.dart';
import 'package:flutter/material.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _checkAuthentication();
  }

  Future<void> _checkAuthentication() async {
    final String? permanentToken = await SecureStorage.getPermanentToken();

    if (permanentToken == null) {
      // No permanent token found, navigate to login
      _navigateTo('/login');
      return;
    }

    // Validate the permanent token
    final bool isValid = await _validatePermanentToken(permanentToken);

    if (!isValid) {
      // Token invalid, navigate to First login
      await SecureStorage.deletePermanentToken(); // Clean up invalid token
      _navigateTo('/firstlogin');
    } else {
      // Token valid, check session token
      if (SessionManager.sessionToken == null) {
        await SecureStorage.deleteToken();
        // No session token, Navigate to login
        _navigateTo('/login');
      }
      // Navigate to home
      _navigateTo('/home');
    }
  }

  Future<bool> _validatePermanentToken(String token) async {
    // Verify from controller function
    await checkmobilestatus(token);
    return true;
  }

  void _navigateTo(String route) {
    Navigator.pushReplacementNamed(context, route);
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: CircularProgressIndicator(), // Loading indicator
      ),
    );
  }
}
