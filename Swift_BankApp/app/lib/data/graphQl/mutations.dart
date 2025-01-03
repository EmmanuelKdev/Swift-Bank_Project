class AuthMutations {
  //first Login mutation

  static String firstTimeLogin = '''
    firstTimeMobileLogin(\$userCode: String!, \$pin: String!) {
      firstTimeMobileLogin(user: \$userCode, password: \$pin) {
        id
        email
        firstName
        lastName
      }
    }

 ''';
  // Normal Login Mutations

  static String login = '''
    mutation mobileLogin(\$email: String!, \$password: String!) {
       mobileLogin(email: \$email, password: \$password) {
       id
       email
       firstName
       lastName
    }
  }
 ''';
}

class Queries {
  // Verify Mobile Status
  static String verifyMobileStatus = '''
    query VerifyMobileStatus(\$mobileHash: String!) {
      verificationMobileStatus(mobileHash: \$mobileHash)
    }
  ''';
}
