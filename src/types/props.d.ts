interface CalculatorState {
  currentNumber: string;
  previousNumber: string;
  operation: string | null;
  isNewNumber: boolean;
  lastExpression: string;
}

interface CalculatorStore extends CalculatorState {
  history: string[];
  setCurrentNumber: (value: string) => void;
  setPreviousNumber: (value: string) => void;
  setOperation: (value: string | null) => void;
  setIsNewNumber: (value: boolean) => void;
  setLastExpression: (value: string) => void;
  addToHistory: (value: string) => void;
  clearAll: () => void;
}

type ThemeState = {
  colorScheme: 'system' | 'light' | 'dark';
};

type ButtonConfigs = {
  value: string;
  className: string;
  onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};
