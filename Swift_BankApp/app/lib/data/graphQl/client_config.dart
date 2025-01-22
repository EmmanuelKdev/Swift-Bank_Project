import 'package:app/data/source/secure_storage_utility.dart';
import 'package:app/data/source/session_manager.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter/foundation.dart';

// Graph Ql configuration class

class GraphQLConfig {
  static String baseUrl = 'http://10.0.2.2:3002/graphql';

  static Future<ValueNotifier<GraphQLClient>> clientToQuery() async {
    final HttpLink httpLink = HttpLink(baseUrl);

    // Fetch the token from the secure storage
    final String? permanentToken = await SecureStorage.getPermanentToken();

    // Define the AuthLink
    final AuthLink authLink = AuthLink(
      getToken: () async {
        if (permanentToken != null) {
          if (SessionManager.sessionToken != null) {
            // Use session token if available
            return 'Bearer ${SessionManager.sessionToken}';
          } else {
            // If no session token, fallback to permanent token
            return 'Bearer $permanentToken';
          }
        }
        // If no tokens are present, return null
        return null;
      },
    );
    final Link link = authLink.concat(httpLink);

    final GraphQLClient client = GraphQLClient(
      cache: GraphQLCache(),
      link: link,
    );
    return ValueNotifier(client);
  }
}
