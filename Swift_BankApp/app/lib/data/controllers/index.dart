import 'package:app/data/source/auth_api_service.dart';
import 'package:app/data/source/resources.dart';
import 'package:dartz/dartz.dart';

Future<void> checkmobilestatus(String hash) async {
  final authservice = AuthApiServiceImpl();

  Either<Failure, bool> result = await authservice.verifyMobileStatus(hash);

  result.fold(
    (failure) {
      return failure;
    },
    (isVerified) {
      return isVerified;
    },
  );
}
