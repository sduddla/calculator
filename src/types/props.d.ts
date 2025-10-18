interface CalculatorState {
  currentNumber: string;
  previousNumber: string;
  operation: string | null;
  isNewNumber: boolean;
  lastExpression?: string;
}

type ThemeState = {
  colorScheme: 'system' | 'light' | 'dark';
};
