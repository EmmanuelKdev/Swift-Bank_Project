class SessionManager {
  static String? sessionToken;

  static void setSessionToken(String token) {
    sessionToken = token;
  }

  static void clearSessionToken() {
    sessionToken = null;
  }
}
