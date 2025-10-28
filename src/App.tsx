import Decimal from 'decimal.js';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import { useCalculatorStore } from './store/useCalculatorStore';

export default function App() {
  const {
    currentNumber,
    previousNumber,
    operation,
    isNewNumber,
    lastExpression,
    history,
    setCurrentNumber,
    setPreviousNumber,
    setOperation,
    setIsNewNumber,
    setLastExpression,
    addToHistory,
    clearAll,
  } = useCalculatorStore();

  const [theme, setTheme] = useState<ThemeState>(() => {
    const saved = localStorage.getItem('color-scheme');
    return {
      colorScheme: (saved as ThemeState['colorScheme']) || 'system',
    };
  });

  // 숫자
  const handleNumber = useCallback(
    (value: string) => {
      if (isNewNumber) {
        setCurrentNumber(value);
        setIsNewNumber(false);
      } else {
        // 이전 숫자에 새로운 숫자 이어 붙이기
        setCurrentNumber(currentNumber === '0' ? value : currentNumber + value);
      }
    },
    [currentNumber, isNewNumber, setCurrentNumber, setIsNewNumber]
  );

  // 숫자 버튼 클릭
  const handleNumberClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    handleNumber(e.currentTarget.value);
  };

  // 연산자
  const handleOperator = useCallback(
    (operator: string) => {
      const current = parseFloat(currentNumber); // 숫자로

      // 이전 숫자와 연산 기호가 모두 있을 경우, 계속 연산
      if (previousNumber !== '' && operation) {
        const prev = parseFloat(previousNumber);
        let result = 0;

        // 연산 기호
        switch (operation) {
          case '+':
            result = new Decimal(prev).plus(current).toNumber();
            break;
          case '-':
            result = new Decimal(prev).minus(current).toNumber();
            break;
          case 'x':
            result = new Decimal(prev).mul(current).toNumber();
            break;
          case '÷':
            result = new Decimal(prev).dividedBy(current).toNumber();
            break;
          case '%':
            result = new Decimal(prev).mod(current).toNumber();
            break;
        }

        if (operator === '=') {
          setCurrentNumber(result.toString());
          setPreviousNumber('');
          setOperation(null);
          setIsNewNumber(true);
          addToHistory(
            `${previousNumber}${operation}${currentNumber}=${result.toString()}`
          );
          setLastExpression(`${previousNumber}${operation}${currentNumber}`);
        } else {
          // 다른 연산 기호 클릭
          setCurrentNumber('');
          setPreviousNumber(result.toString());
          setOperation(operator);
          setIsNewNumber(true);
        }
      } else if (currentNumber !== '' && operator === '=') {
        setIsNewNumber(true);
      } else {
        // 첫 번째 숫자 입력 후 연산 클릭하는 경우
        setPreviousNumber(current.toString());
        setOperation(operator);
        setIsNewNumber(true);
      }
    },
    [
      addToHistory,
      currentNumber,
      operation,
      previousNumber,
      setCurrentNumber,
      setIsNewNumber,
      setLastExpression,
      setOperation,
      setPreviousNumber,
    ]
  );

  // 연산자 버튼 클릭
  const handleOperatorClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const operator = e.currentTarget.value; // 현재 선택한 연산 기호
    handleOperator(operator);
  };

  // DEL 버튼 클릭
  const handleDelete = () => {
    setCurrentNumber(currentNumber.slice(0, -1));
    setLastExpression('');
  };

  // AC 버튼 클릭
  const handleClear = () => {
    clearAll();
  };

  // 소수점 버튼 클릭
  const handleDot = useCallback(() => {
    setCurrentNumber(currentNumber + '.');
    setIsNewNumber(false);
  }, [currentNumber, setCurrentNumber, setIsNewNumber]);

  useLayoutEffect(() => {
    if (theme.colorScheme === 'system') {
      document.documentElement.classList.remove('light', 'dark');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.add('light');
      }
    } else {
      // 시스템 아닐 때
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme.colorScheme);
    }

    localStorage.setItem('color-scheme', theme.colorScheme);
  }, [theme]);

  // 키보드 입력
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (!isNaN(Number(key))) {
        handleNumber(key);
      } else if (['+', '-', '*', '/', '%'].includes(key)) {
        const mappedOperator = key === '*' ? 'x' : key === '/' ? '÷' : key;
        handleOperator(mappedOperator);
      } else if (key === 'Enter' || key === '=') {
        handleOperator('=');
      } else if (key === 'Backspace') {
        setCurrentNumber(currentNumber.slice(0, -1));
        setLastExpression('');
      } else if (key === 'Escape') {
        clearAll();
      } else if (key === '.') {
        handleDot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    clearAll,
    currentNumber,
    handleDot,
    handleNumber,
    handleOperator,
    setCurrentNumber,
    setLastExpression,
  ]);

  return (
    <>
      <div className='bg-[#E6E9F0] flex items-center justify-center h-screen'>
        <article className='w-[360px] bg-[#fff] rounded-2xl p-5 shadow-2xl dark:bg-[#1C1C1C]'>
          <ThemeToggle
            colorScheme={theme.colorScheme}
            themeChange={(scheme) => setTheme({ colorScheme: scheme })}
          />
          <div className='w-full h-[70px] rounded-sm mt-3 mb-6 overflow-y-auto px-2 shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]'>
            {history.length === 0
              ? ''
              : history.map((result, index) => (
                  <div
                    key={index}
                    className='mt-1 last:mb-1 text-[12px] text-gray-500'
                  >
                    {result}
                  </div>
                ))}
          </div>
          <div className='text-sm text-right px-2 opacity-70 h-[24px] dark:text-[#fff]'>
            {lastExpression ?? ''}
          </div>
          <input
            type='text'
            className='text-right text-4xl mb-5 px-2 w-full dark:text-[#fff] outline-none'
            value={
              previousNumber && operation
                ? `${previousNumber}${operation}${
                    isNewNumber ? '' : currentNumber
                  }`
                : currentNumber || '0'
            }
            readOnly
          />

          <form className='grid grid-cols-4 gap-4 auto-rows-[60px]'>
            <input
              type='button'
              value='DEL'
              className='calc-btn calc-gray'
              onClick={handleDelete}
            />
            <input
              type='button'
              value='AC'
              className='calc-btn calc-gray'
              onClick={handleClear}
            />
            <input
              type='button'
              value='%'
              className='calc-btn calc-gray'
              onClick={handleOperatorClick}
            />
            <input
              type='button'
              value='÷'
              className='calc-btn calc-blue'
              onClick={handleOperatorClick}
            />

            <input
              type='button'
              value='7'
              className='calc-btn calc-white'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='8'
              className='calc-btn calc-white'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='9'
              className='calc-btn calc-white'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='x'
              className='calc-btn calc-blue'
              onClick={handleOperatorClick}
            />

            <input
              type='button'
              value='4'
              className='calc-btn calc-white'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='5'
              className='calc-btn calc-white'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='6'
              className='calc-btn calc-white'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='-'
              className='calc-btn calc-blue'
              onClick={handleOperatorClick}
            />

            <input
              type='button'
              value='1'
              className='calc-btn calc-white'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='2'
              className='calc-btn calc-white'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='3'
              className='calc-btn calc-white'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='+'
              className='calc-btn calc-blue'
              onClick={handleOperatorClick}
            />

            <input
              type='button'
              value='0'
              className='calc-btn col-span-2 calc-white'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='.'
              className='calc-btn calc-white'
              onClick={handleDot}
            />
            <input
              type='button'
              value='='
              className='calc-btn calc-blue'
              onClick={handleOperatorClick}
            />
          </form>
        </article>
      </div>
    </>
  );
}
