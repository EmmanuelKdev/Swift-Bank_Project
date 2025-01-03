import 'package:app/data/graphQl/client_config.dart';
import 'package:get_it/get_it.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

final serviceLocator = GetIt.instance;

Future<void> setupServiceLocator() async {
  // Initialize GraphQL client
  final clientNotifier = await GraphQLConfig.clientToQuery();

  // Register the GraphQLClient with GetIt
  serviceLocator.registerSingleton<GraphQLClient>(clientNotifier.value);
}
