import Decimal from 'decimal.js';
import { useState } from 'react';

export default function App() {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    currentNumber: '0', // 현재 입력 중인 숫자
    previousNumber: '', // 이전에 입력된 숫자
    operation: null, // 클릭한 연산 기호
    isNewNumber: false, // 새로운 숫자 입력 여부
    lastExpression: '', // 수식
  });

  const [history, setHistory] = useState<string[]>([]);

  // 숫자 버튼 클릭
  const handleNumberClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const value = e.currentTarget.value;

    if (calculatorState.isNewNumber) {
      // 새로운 숫자
      setCalculatorState({
        ...calculatorState,
        currentNumber: value,
        isNewNumber: false,
      });
    } else {
      // 이전 숫자에 새로운 숫자 이어 붙이기
      setCalculatorState({
        ...calculatorState,
        currentNumber:
          calculatorState.currentNumber === '0'
            ? value
            : calculatorState.currentNumber + value,
      });
    }
  };

  // 연산자 버튼 클릭
  const handleOperatorClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const operator = e.currentTarget.value; // 현재 선택한 연산 기호

    const current = parseFloat(calculatorState.currentNumber); // 숫자로

    // 이전 숫자와 연산 기호가 모두 있을 경우, 계속 연산
    if (calculatorState.previousNumber !== '' && calculatorState.operation) {
      const prev = parseFloat(calculatorState.previousNumber);
      let result = 0;

      // 연산 기호
      switch (calculatorState.operation) {
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
        setCalculatorState({
          currentNumber: result.toString(),
          previousNumber: '',
          operation: null,
          isNewNumber: true,
          lastExpression: `${calculatorState.previousNumber}${calculatorState.operation}${calculatorState.currentNumber}`,
        });

        setHistory((prev) => [
          ...prev,
          `${calculatorState.previousNumber}${calculatorState.operation}${
            calculatorState.currentNumber
          }=${result.toString()}`,
        ]);
      } else {
        // 다른 연산 기호 클릭
        setCalculatorState({
          currentNumber: '',
          previousNumber: result.toString(),
          operation: operator,
          isNewNumber: true,
        });
      }
    } else if (calculatorState.currentNumber !== '' && operator === '=') {
      setCalculatorState({
        ...calculatorState,
        isNewNumber: true,
      });
    } else {
      // 첫 번째 숫자 입력 후 연산 클릭하는 경우
      setCalculatorState({
        currentNumber: '',
        previousNumber: current.toString(),
        operation: operator,
        isNewNumber: true,
      });
    }
  };

  // DEL 버튼 클릭
  const handleDelete = () => {
    setCalculatorState((prev: CalculatorState) => ({
      ...prev,
      currentNumber: prev.currentNumber.slice(0, -1),
      lastExpression: '',
    }));
  };

  // AC 버튼 클릭
  const handleClear = () => {
    setCalculatorState({
      currentNumber: '0',
      previousNumber: '',
      operation: null,
      isNewNumber: true,
      lastExpression: '',
    });
  };

  // 소수점 버튼 클릭
  const handleDot = () => {
    setCalculatorState({
      ...calculatorState,
      currentNumber: calculatorState.currentNumber + '.',
      isNewNumber: false,
    });
  };

  return (
    <>
      <div className='bg-gray-600 flex items-center justify-center h-screen'>
        <article className='w-[360px] bg-[#fff] rounded-2xl p-5 shadow-2xl'>
          <div
            className='w-full h-[70px] rounded-sm mt-3 mb-6 overflow-y-auto px-2'
            style={{
              boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.15)',
            }}
          >
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
          <div className='text-sm text-right px-2 opacity-70 h-[24px]'>
            {calculatorState.lastExpression ?? ''}
          </div>
          <input
            type='text'
            className='text-right text-4xl mb-5 px-2 text-black w-full'
            value={
              calculatorState.previousNumber && calculatorState.operation
                ? `${calculatorState.previousNumber}${calculatorState.operation}${calculatorState.currentNumber}`
                : calculatorState.currentNumber || '0'
            }
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
              className='calc-btn'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='8'
              className='calc-btn'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='9'
              className='calc-btn'
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
              className='calc-btn'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='5'
              className='calc-btn'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='6'
              className='calc-btn'
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
              className='calc-btn'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='2'
              className='calc-btn'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='3'
              className='calc-btn'
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
              className='calc-btn col-span-2'
              onClick={handleNumberClick}
            />
            <input
              type='button'
              value='.'
              className='calc-btn'
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
