import { useState, useEffect } from 'react';
import { CalculatorDisplay } from './CalculatorDisplay';
import { CalculatorKey } from './CalculatorKey';

export const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [subDisplayValue, setSubDisplayValue] = useState('');
    const [operator, setOperator] = useState<null | '/' | '*' | '+' | '-' | '=' | '%' | '^'>(null);
    const [value, setValue] = useState<null | number>(null);
    const [prevValue, setPrevValue] = useState<null | number>(null);
    const [isBeforeOperand, setIsBeforeOperand] = useState(false);

    const CalculatorOperations = {
        '/': (prevValue: number, nextValue: number) => prevValue / nextValue,
        '*': (prevValue: number, nextValue: number) => prevValue * nextValue,
        '+': (prevValue: number, nextValue: number) => prevValue + nextValue,
        '-': (prevValue: number, nextValue: number) => prevValue - nextValue,
        '%': (prevValue: number, nextValue: number) => prevValue % nextValue,
        '^': (prevValue: number, nextValue: number) => Math.pow(prevValue, nextValue),
        '=': (nextValue: number) => nextValue

    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;

            if (key >= '0' && key <= '9') {
                inputDigit(parseInt(key, 10));
            } else if (key === '.') {
                inputPercent();
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault();
                performOperation('=');
            } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === '^') {
                performOperation(key as '/' | '*' | '+' | '-' | '%' | '^');
            } else if (key === 'Escape' || key === 'C' || key === 'c') {
                clearDisplay();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);

        };

    }, [displayValue, subDisplayValue, operator, value, isBeforeOperand]);

    const clearDisplay = () => {
        setDisplayValue(('0'));
        setSubDisplayValue(('0'));
        setValue(null);
        setIsBeforeOperand(false);

    };

    const inputPercent = () => {
        // 이미 소수점이 있는지 확인
        if (!displayValue.includes('.')) {
            setDisplayValue(prevInput => prevInput + '.');

        }

    };

    const inputDigit = (digit: number) => {

        if (isBeforeOperand) {
            setDisplayValue(String(digit));
            setSubDisplayValue(subDisplayValue);
            setIsBeforeOperand(false);

            if (operator == '=') {
                setValue(null);

            }
        } else {
            setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);

        }

    };

    const performOperation = (nextOperator: '/' | '*' | '+' | '-' | '=' | '%' | '^') => {
        const inputValue = parseFloat(displayValue);

        try {
            // 0으로 나누기나 나머지 구하기를 시도할 때
            if ((operator === '/' || operator === '%') && inputValue === 0) {
                throw new Error("Cannot divide by zero.");
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

                // 너무 큰 수가 setDisplayValue 에 들어갈때
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
                <CalculatorDisplay value={displayValue} subValue={subDisplayValue} />
                <div className='mt-[20px]'>
                    <div className='flex justify-between gap-x-5'>
                        <div id='key' className='grid grid-cols-3 gap-x-3 gap-y-3'>
                            <CalculatorKey bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(1)} label='1' width={'w-[65px]'} font={'text-[24px]'} />
                            <CalculatorKey bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(2)} label='2' width={'w-[65px]'} font={'text-[24px]'} />
                            <CalculatorKey bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(3)} label='3' width={'w-[65px]'} font={'text-[24px]'} />
                            <CalculatorKey bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(4)} label='4' width={'w-[65px]'} font={'text-[24px]'} />
                            <CalculatorKey bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(5)} label='5' width={'w-[65px]'} font={'text-[24px]'} />
                            <CalculatorKey bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(6)} label='6' width={'w-[65px]'} font={'text-[24px]'} />
                            <CalculatorKey bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(7)} label='7' width={'w-[65px]'} font={'text-[24px]'} />
                            <CalculatorKey bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(8)} label='8' width={'w-[65px]'} font={'text-[24px]'} />
                            <CalculatorKey bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(9)} label='9' width={'w-[65px]'} font={'text-[24px]'} />
                            <CalculatorKey bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputPercent()} label='.' width={'w-[65px]'} font={'text-[24px]'} />
                            <CalculatorKey bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => inputDigit(0)} label='0' width={'w-[65px]'} font={'text-[24px]'} />
                            <CalculatorKey bgc='bg-sub' radius='rounded-main_sub' shadow='shadow-custom' onPress={() => clearDisplay()} label='' width={'w-[65px]'} font={'text-[24px]'} />
                        </div>
                        <div id='key' className='grid grid-cols-2 gap-x-3 gap-y-3'>
                            <CalculatorKey bgc='bg-aaa' radius='rounded-aaa' shadow='shadow-custom' onPress={() => performOperation('*')} label='×' width={'w-[45px]'} font={'text-[32px]'} />
                            <CalculatorKey bgc='bg-aaa' radius='rounded-aaa' shadow='shadow-custom' onPress={() => performOperation('/')} label='÷' width={'w-[45px]'} font={'text-[32px]'} />
                            <CalculatorKey bgc='bg-aaa' radius='rounded-aaa' shadow='shadow-custom' onPress={() => performOperation('+')} label='+' width={'w-[45px]'} font={'text-[32px]'} />
                            <CalculatorKey bgc='bg-aaa' radius='rounded-aaa' shadow='shadow-custom' onPress={() => performOperation('-')} label='-' width={'w-[45px]'} font={'text-[32px]'} />
                            <CalculatorKey bgc='bg-aaa' radius='rounded-aaa' shadow='shadow-custom' onPress={() => performOperation('%')} label='%' width={'w-[45px]'} font={'text-[24px]'} />
                            <CalculatorKey bgc='bg-aaa' radius='rounded-aaa' shadow='shadow-custom' onPress={() => performOperation('^')} label='^' width={'w-[45px]'} font={'text-[24px]'} />
                            <div className='col-span-2'>
                                <CalculatorKey bgc='bg-bbb' isHighlighted={true} radius='rounded-bbb' shadow='shadow-custom' onPress={() => performOperation('=')} label='=' width={'w-[100%]'} font={'text-[28px]'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
