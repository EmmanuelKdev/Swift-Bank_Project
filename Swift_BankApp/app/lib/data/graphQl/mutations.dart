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

  // Create New PIN Mutation
  static String createNewPin = '''
    mutation CreateNewPin(\$userCode: String!, \$pin: String!) {
      createNewPin(userCode: \$userCode, pin: \$pin) {
        success
        message
        user {
          id
          email
          firstName
          lastName
        }
      }
    }
  ''';

  // Normal Login Mutations

  static String login = '''
    mutation MobileLogin(\$pin: String!) {
      mobileLogin(pin: \$pin) {
        success
        message
        user {
          id
          email
          firstName
          lastName
          sessionToken
        }
        errors {
          field
          message
        }
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
