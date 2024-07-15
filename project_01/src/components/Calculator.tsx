import { useEffect, useState } from 'react';
import { Button } from './Button';
import { Display } from './Display';

// 메인 Calculator 컴포넌트
export const Calculator = () => {
    // 디스플레이, 연산자, 값들을 관리하는 상태 훅들
    const [displayValue, setDisplayValue] = useState('0'); // 현재 디스플레이 값
    const [subDisplayValue, setSubDisplayValue] = useState(''); // 이전 계산식 디스플레이 값
    const [operator, setOperator] = useState<null | '/' | '*' | '+' | '-' | '=' | '%' | '^'>(null); // 현재 연산자
    const [value, setValue] = useState<null | number>(null); // 첫 번째 피연산자
    const [prevValue, setPrevValue] = useState<null | number>(null); // 이전 피연산자
    const [isBeforeOperand, setIsBeforeOperand] = useState(false); // 피연산자 입력 전 상태 확인

    // 계산기 연산 함수들
    const CalculatorOperations = {
        '/': (prevValue: number, nextValue: number) => prevValue / nextValue,
        '*': (prevValue: number, nextValue: number) => prevValue * nextValue,
        '+': (prevValue: number, nextValue: number) => prevValue + nextValue,
        '-': (prevValue: number, nextValue: number) => prevValue - nextValue,
        '%': (prevValue: number, nextValue: number) => prevValue % nextValue,
        '^': (prevValue: number, nextValue: number) => Math.pow(prevValue, nextValue),
        '=': (nextValue: number) => nextValue
    };

    // 키보드 입력 처리
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;

            if (key >= '0' && key <= '9') {
                inputDigit(parseInt(key, 10)); // 숫자 키 입력
            } else if (key === '.') {
                inputPercent(); // 소수점 입력
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault();
                performOperation('='); // 엔터 키 입력
            } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === '^') {
                performOperation(key as '/' | '*' | '+' | '-' | '%' | '^'); // 연산자 키 입력
            } else if (key === 'Escape' || key === 'C' || key === 'c') {
                clearDisplay(); // ESC 키 또는 C 키 입력
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [displayValue, subDisplayValue, operator, value, isBeforeOperand]);

    // 디스플레이 초기화 함수
    const clearDisplay = () => {
        setDisplayValue('0');
        setSubDisplayValue('0');
        setValue(null);
        setIsBeforeOperand(false);
    };

    // 소수점 입력 함수
    const inputPercent = () => {
        if (!displayValue.includes('.')) {
            setDisplayValue(prevInput => prevInput + '.');
        }
    };

    // 숫자 입력 함수
    const inputDigit = (digit: number) => {
        if (isBeforeOperand) {
            setDisplayValue(String(digit));
            setSubDisplayValue(subDisplayValue);
            setIsBeforeOperand(false);

            if (operator === '=') {
                setValue(null);
            }
        } else {
            setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
        }
    };

    // 연산 수행 함수
    const performOperation = (nextOperator: '/' | '*' | '+' | '-' | '=' | '%' | '^') => {
        const inputValue = parseFloat(displayValue);

        try {
            // 0으로 나누기나 나머지 구하기 시도 시 에러 처리
            if ((operator === '/' || operator === '%') && inputValue === 0) {
                throw new Error("Cannot divide by zero");
            }

            if (value == null) {
                setValue(inputValue);
                setPrevValue(inputValue);

                if (displayValue !== '0') {
                    setSubDisplayValue(inputValue + ' ' + nextOperator);
                }
            } else if (operator) {
                const currentValue = value || 0;
                const newValue = CalculatorOperations[operator](currentValue, inputValue);

                // 너무 큰 수가 나올 때 에러 처리
                if (!isFinite(newValue)) {
                    throw new Error("The result is too large.");
                }

                if (newValue === 0) {
                    setValue(null);
                    setSubDisplayValue('0');
                } else if (nextOperator === '=') {
                    if (newValue !== prevValue) {
                        setSubDisplayValue(prevValue + ' ' + operator + ' ' + inputValue + ' ' + nextOperator);
                        setPrevValue(newValue);
                    }
                    setDisplayValue(String(newValue));
                    setOperator(nextOperator);
                    setValue(newValue);
                } else {
                    setValue(newValue);
                    setSubDisplayValue(newValue + ' ' + nextOperator);
                }
                setDisplayValue(String(newValue));
            }
            setIsBeforeOperand(true);
            setOperator(nextOperator);
        } catch (error: any) {
            alert("Error: " + error.message);  // 에러 메시지를 알림으로 표시
            setDisplayValue("0");  // 디스플레이 값을 "0"으로 설정
            setSubDisplayValue('');
            setValue(null);
            setPrevValue(null);
            setOperator(null);
        }
    };

    return (
        <>
            <div className='flex flex-col p-[25px] items-center bg-ccc w-[400px] h-[367px] shadow-light-gray-blue-100 shadow-lg'>
                <Display value={displayValue} subValue={subDisplayValue} />
                <div className='mt-[20px]'>
                    <div className='flex justify-between gap-x-5'>
                        <div id='key' className='grid grid-cols-3 gap-x-3 gap-y-3'>
                            {/* 각 숫자 키 및 소수점 키 */}
                            <Button bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(1)} label='1' width={'w-[65px]'} font={'text-[24px]'} />
                            <Button bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(2)} label='2' width={'w-[65px]'} font={'text-[24px]'} />
                            <Button bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(3)} label='3' width={'w-[65px]'} font={'text-[24px]'} />
                            <Button bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(4)} label='4' width={'w-[65px]'} font={'text-[24px]'} />
                            <Button bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(5)} label='5' width={'w-[65px]'} font={'text-[24px]'} />
                            <Button bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(6)} label='6' width={'w-[65px]'} font={'text-[24px]'} />
                            <Button bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(7)} label='7' width={'w-[65px]'} font={'text-[24px]'} />
                            <Button bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(8)} label='8' width={'w-[65px]'} font={'text-[24px]'} />
                            <Button bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(9)} label='9' width={'w-[65px]'} font={'text-[24px]'} />
                            <Button bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputPercent()} label='.' width={'w-[65px]'} font={'text-[24px]'} />
                            <Button bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(0)} label='0' width={'w-[65px]'} font={'text-[24px]'} />
                            <Button bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => clearDisplay()} label='' width={'w-[65px]'} font={'text-[24px]'} />
                        </div>
                        <div id='key' className='grid grid-cols-2 gap-x-3 gap-y-3'>
                            {/* 각 연산자 키 */}
                            <Button bgc='bg-aaa' radius='rounded-aaa' shadow='shadow-custom' onPress={() => performOperation('*')} label='×' width={'w-[45px]'} font={'text-[32px]'} />
                            <Button bgc='bg-aaa' radius='rounded-aaa' shadow='shadow-custom' onPress={() => performOperation('/')} label='÷' width={'w-[45px]'} font={'text-[32px]'} />
                            <Button bgc='bg-aaa' radius='rounded-aaa' shadow='shadow-custom' onPress={() => performOperation('+')} label='+' width={'w-[45px]'} font={'text-[32px]'} />
                            <Button bgc='bg-aaa' radius='rounded-aaa' shadow='shadow-custom' onPress={() => performOperation('-')} label='-' width={'w-[45px]'} font={'text-[32px]'} />
                            <Button bgc='bg-aaa' radius='rounded-aaa' shadow='shadow-custom' onPress={() => performOperation('%')} label='%' width={'w-[45px]'} font={'text-[24px]'} />
                            <Button bgc='bg-aaa' radius='rounded-aaa' shadow='shadow-custom' onPress={() => performOperation('^')} label='^' width={'w-[45px]'} font={'text-[24px]'} />
                            <div className='col-span-2'>
                                <Button bgc='bg-bbb' isHighlighted={true} radius='rounded-bbb' shadow='shadow-custom' onPress={() => performOperation('=')} label='=' width={'w-[100%]'} font={'text-[28px]'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};