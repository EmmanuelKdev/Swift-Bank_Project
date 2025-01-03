export const generateAccountNumber = (): string => {
    // Generate a random 10-digit number
    const randomPart = Math.floor(Math.random() * 9000000000) + 1000000000;
    
    // Add a check digit using Luhn algorithm
    const digits = randomPart.toString().split('').map(Number);
    let sum = 0;
    
    for (let i = 0; i < digits.length; i++) {
      let digit = digits[i];
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    
    const checkDigit = (10 - (sum % 10)) % 10;
    
    return `${randomPart}${checkDigit}`;
  };