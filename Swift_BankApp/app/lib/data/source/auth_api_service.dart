import 'package:app/data/graphQl/mutations.dart';
import 'package:app/data/models/authmodels.dart';
import 'package:app/data/source/resources.dart';
import 'package:app/data/source/service_locator.dart';
import 'package:dartz/dartz.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:app/data/source/secure_storage_utility.dart';

abstract class AuthApiService {
  Future<Either<Failure, AuthResponse>> firstLogin({
    required String userCode,
    required String pin,
  });
}

class AuthApiServiceImpl extends AuthApiService {
  final GraphQLClient _client = serviceLocator<GraphQLClient>();

  @override
  Future<Either<Failure, AuthResponse>> firstLogin({
    required String userCode,
    required String pin,
  }) async {
    try {
      final MutationOptions options = MutationOptions(
        document: gql(AuthMutations.firstTimeLogin),
        variables: <String, dynamic>{
          'userCode': userCode,
          'pin': pin,
        },
      );
      // initiate the mutation
      final QueryResult result = await _client.mutate(options);
      if (result.hasException) {
        return Left(NetworkFailure('Network Failure'));
      }
      // parse the response into the model
      final authResponse =
          AuthResponse.fromJson(result.data!['firstTimeLogin']);
      //Get and save the push token
      FirebaseMessaging.instance.getToken().then((String? token) {
        if (token != null) {
          SecureStorage.savePushToken(token);
        }
      });
      // Get and save the mobile hash
      await SecureStorage.savePermanentToken(authResponse.mobileHash);
      // return the model with the right side of the Either or data.
      return Right(authResponse);
    } catch (e) {
      return Left(ServerFailure('Server Failure'));
    }
  }

  Future<Either<Failure, AuthResponse>> login({
    required String pin,
  }) async {
    try {
      final MutationOptions options = MutationOptions(
        document: gql(AuthMutations.login),
        variables: <String, dynamic>{
          'pin': pin,
        },
      );

      final QueryResult result = await _client.mutate(options);

      if (result.hasException) {
        return Left(NetworkFailure('Network Failure'));
      }

      final authResponse = AuthResponse.fromJson(result.data!['login']);

      return Right(authResponse);
    } catch (e) {
      return Left(ServerFailure('Server Failure'));
    }
  }

  Future<Either<Failure, bool>> verifyMobileStatus(String mobileHash) async {
    try {
      final QueryOptions options = QueryOptions(
        document: gql(Queries.verifyMobileStatus),
        variables: {
          'mobileHash': mobileHash,
        },
      );

      final QueryResult result = await _client.query(options);

      if (result.hasException) {
        return Left(ServerFailure(result.exception.toString()));
      }

      return Right(result.data?['verificationMobileStatus'] ?? false);
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }
}
