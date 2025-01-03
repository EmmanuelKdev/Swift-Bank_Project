import 'package:flutter/material.dart';

class LoginScreenTwo extends StatefulWidget {
  const LoginScreenTwo({super.key});

  @override
  State<LoginScreenTwo> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreenTwo> {
  final _formKey = GlobalKey<FormState>();
  final _userCodeController = TextEditingController();
  final _bankPinController = TextEditingController();
  final _newPinController = TextEditingController();
  final _confirmNewPinController = TextEditingController();
  bool _isFirstStepComplete = false;
  bool _isSecondStepComplete = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(36.0),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (!_isFirstStepComplete) ...[
                // First step: User code and bank PIN
                TextFormField(
                  controller: _userCodeController,
                  decoration: const InputDecoration(
                      enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                              color: Color.fromARGB(255, 255, 255, 255))),
                      focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                              color: Color.fromARGB(255, 214, 213, 213))),
                      fillColor: Color.fromARGB(255, 255, 254, 254),
                      filled: true,
                      labelText: 'Enter 8-digit User Code'),
                  keyboardType: TextInputType.number,
                  maxLength: 8,
                  validator: (value) {
                    if (value == null || value.length != 8) {
                      return 'Please enter a valid 8-digit code';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _bankPinController,
                  decoration: const InputDecoration(
                      enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                              color: Color.fromARGB(255, 255, 255, 255))),
                      focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                              color: Color.fromARGB(255, 214, 213, 213))),
                      fillColor: Color.fromARGB(255, 255, 254, 254),
                      filled: true,
                      labelText: 'Enter 4-digit Bank PIN'),
                  keyboardType: TextInputType.number,
                  obscureText: true,
                  maxLength: 4,
                  validator: (value) {
                    if (value == null || value.length != 4) {
                      return 'Please enter a valid 4-digit PIN';
                    }
                    return null;
                  },
                ),
                ElevatedButton(
                  onPressed: _validateFirstStep,
                  child: const Text('Verify Credentials'),
                ),
              ] else if (!_isSecondStepComplete) ...[
                // Second step: Create new PIN
                TextFormField(
                  controller: _newPinController,
                  decoration: const InputDecoration(
                      labelText: 'Create new 5-digit PIN'),
                  keyboardType: TextInputType.number,
                  obscureText: true,
                  maxLength: 5,
                  validator: (value) {
                    if (value == null || value.length != 5) {
                      return 'Please enter a 5-digit PIN';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _confirmNewPinController,
                  decoration:
                      const InputDecoration(labelText: 'Confirm new PIN'),
                  keyboardType: TextInputType.number,
                  obscureText: true,
                  maxLength: 5,
                  validator: (value) {
                    if (value != _newPinController.text) {
                      return 'PINs do not match';
                    }
                    return null;
                  },
                ),
                ElevatedButton(
                  onPressed: _setNewPin,
                  child: const Text('Set New PIN'),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  void _validateFirstStep() {
    if (_formKey.currentState!.validate()) {
      // Here you would typically verify the credentials with your backend
      // For now, we'll just move to the next step
      setState(() {
        _isFirstStepComplete = true;
      });
    }
  }

  void _setNewPin() {
    if (_formKey.currentState!.validate()) {
      // Here you would typically save the new PIN securely
      // and proceed to the main app screen
      setState(() {
        _isSecondStepComplete = true;
      });
      // Navigate to main app screen
      // Navigator.of(context).pushReplacement(
      //   MaterialPageRoute(builder: (context) => const MainScreen()),
      // );
    }
  }

  @override
  void dispose() {
    _userCodeController.dispose();
    _bankPinController.dispose();
    _newPinController.dispose();
    _confirmNewPinController.dispose();
    super.dispose();
  }
}
