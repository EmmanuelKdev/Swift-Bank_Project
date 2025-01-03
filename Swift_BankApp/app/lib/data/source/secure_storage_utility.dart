import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
  static const _storage = FlutterSecureStorage();

  // Keys
  static const _tokenKey = 'auth_token';
  static const _permanentTokenKey = 'permanent_token';

  // Write a token
  static Future<void> saveToken(String token) async {
    await _storage.write(key: _tokenKey, value: token);
  }

  static Future<void> savePermanentToken(String token) async {
    await _storage.write(key: _permanentTokenKey, value: token);
  }

  // Read a token
  static Future<String?> getToken() async {
    return await _storage.read(key: _tokenKey);
  }

  static Future<String?> getPermanentToken() async {
    return await _storage.read(key: _permanentTokenKey);
  }

  // Delete a token
  static Future<void> deleteToken() async {
    await _storage.delete(key: _tokenKey);
  }

  static Future<void> deletePermanentToken() async {
    await _storage.delete(key: _permanentTokenKey);
  }
}
