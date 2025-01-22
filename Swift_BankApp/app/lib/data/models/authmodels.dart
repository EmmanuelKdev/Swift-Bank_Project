class AuthResponse {
  final String id;
  final String email;
  final String token;
  final String mobileHash;

  AuthResponse({
    required this.id,
    required this.email,
    required this.token,
    required this.mobileHash,
  });

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      id: json['id'],
      email: json['email'],
      token: json['token'],
      mobileHash: json['mobileHash'],
    );
  }
}
