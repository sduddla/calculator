// stores/calculatorStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    immer((set) => ({
      currentNumber: '0',
      previousNumber: '',
      operation: null,
      isNewNumber: false,
      lastExpression: '',
      history: [],
      setCurrentNumber: (value) =>
        set((state) => {
          state.currentNumber = value;
        }),
      setPreviousNumber: (value) =>
        set((state) => {
          state.previousNumber = value;
        }),
      setOperation: (value) =>
        set((state) => {
          state.operation = value;
        }),
      setIsNewNumber: (value) =>
        set((state) => {
          state.isNewNumber = value;
        }),
      setLastExpression: (value) =>
        set((state) => {
          state.lastExpression = value;
        }),
      addToHistory: (value) =>
        set((state) => {
          state.history.push(value);
        }),
      clearAll: () =>
        set((state) => {
          state.currentNumber = '0';
          state.previousNumber = '';
          state.operation = null;
          state.isNewNumber = true;
          state.lastExpression = '';
          state.history = [];
        }),
    })),
    { name: 'calculator' }
  )
);
