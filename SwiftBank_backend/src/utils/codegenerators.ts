export const generate8DigitCode = (): string => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };
  
  export const generate4DigitPin = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  
  // Optional: Generate with expiry
  export const generateVerificationCode = (expiryMinutes: number = 10) => {
    return {
      code: generate8DigitCode(),
      expiresAt: new Date(Date.now() + expiryMinutes * 60000)
    };
  };