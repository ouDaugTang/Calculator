import { useState } from "react"
import { CalculatorDisplay } from "./CalculatorDisplay";
import { CalculatorKey } from "./CalculatorKey"

const CalculatorOperations = {
    '/': (prevValue: number, nextValue: number) => prevValue / nextValue,
    '*': (prevValue: number, nextValue: number) => prevValue * nextValue,
    '+': (prevValue: number, nextValue: number) => prevValue + nextValue,
    '-': (prevValue: number, nextValue: number) => prevValue - nextValue,
    '=': (prevValue: number, nextValue: number) => nextValue,
}

export const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState<null | '/' | '*' | '+' | '-' | '='>(null);
    const [value, setValue] = useState<null | number>(null);
    const [isBeforeOperand, setIsBeforeOperand] = useState(false);

    const clearDisplay = () => {
        setDisplayValue(('0'))
        setIsBeforeOperand(false)
    }

    const toggleSign = () => {
        const newValue = parseFloat(displayValue) * -1;
        setDisplayValue(String(newValue));
    }

    const inputPercent = () => {
        const currentValue = parseFloat(displayValue);
        if (currentValue === 0) return;

        const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
        const newValue = currentValue / 100;
        setDisplayValue(newValue.toFixed(fixedDigits.length + 2))

    }

    const inputDigit = (digit: number) => {
        if (isBeforeOperand) {
            setDisplayValue(String(digit))
            setIsBeforeOperand(false)
        } else {
            setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit)
        }
    }

    const inputDot = () => {
        if (!/\./.test(displayValue)) {
            setDisplayValue(displayValue + '.')
        }
    }

    const performOperation = (nextOperator: '/' | '*' | '+' | '-' | '=') => {
        const inputValue = parseFloat(displayValue)

        if (value == null) {
            setValue(inputValue);
        } else if (operator) {
            const currentValue = value || 0;
            const newValue = CalculatorOperations[operator](currentValue, inputValue);
            setValue(newValue);
            setDisplayValue(String(newValue))
        }
        setIsBeforeOperand(true)
        setOperator(nextOperator)
    }


    return (
        <>
            <div className="flex flex-col p-[25px] items-center bg-ccc w-[400px] h-[367px] shadow-light-gray-blue-100 shadow-lg">
                <CalculatorDisplay value={displayValue} />
                <div className="mt-[20px] mb-[20px]">
                    <div className="flex justify-between gap-x-5">
                        <div id="key" className="grid grid-cols-3 gap-x-3 gap-y-5">
                            <CalculatorKey color="bg-sub" radius="rounded-[20px]" onPress={() => inputDigit(1)} label='1' width={"w-[65px]"} font={"text-[24px]"} />
                            <CalculatorKey color="bg-sub" radius="rounded-[20px]" onPress={() => inputDigit(2)} label='2' width={"w-[65px]"} font={"text-[24px]"} />
                            <CalculatorKey color="bg-sub" radius="rounded-[20px]" onPress={() => inputDigit(3)} label='3' width={"w-[65px]"} font={"text-[24px]"} />
                            <CalculatorKey color="bg-sub" radius="rounded-[20px]" onPress={() => inputDigit(4)} label='4' width={"w-[65px]"} font={"text-[24px]"} />
                            <CalculatorKey color="bg-sub" radius="rounded-[20px]" onPress={() => inputDigit(5)} label='5' width={"w-[65px]"} font={"text-[24px]"} />
                            <CalculatorKey color="bg-sub" radius="rounded-[20px]" onPress={() => inputDigit(6)} label='6' width={"w-[65px]"} font={"text-[24px]"} />
                            <CalculatorKey color="bg-sub" radius="rounded-[20px]" onPress={() => inputDigit(7)} label='7' width={"w-[65px]"} font={"text-[24px]"} />
                            <CalculatorKey color="bg-sub" radius="rounded-[20px]" onPress={() => inputDigit(8)} label='8' width={"w-[65px]"} font={"text-[24px]"} />
                            <CalculatorKey color="bg-sub" radius="rounded-[20px]" onPress={() => inputDigit(9)} label='9' width={"w-[65px]"} font={"text-[24px]"} />
                            <CalculatorKey color="bg-sub" radius="rounded-[20px]" onPress={() => inputDigit(7)} label='.' width={"w-[65px]"} font={"text-[24px]"} />
                            <CalculatorKey color="bg-sub" radius="rounded-[20px]" onPress={() => inputDigit(8)} label='0' width={"w-[65px]"} font={"text-[24px]"} />
                            <CalculatorKey color="bg-sub" radius="rounded-[20px]" onPress={() => inputDigit(9)} label='' width={"w-[65px]"} font={"text-[24px]"} />
                        </div>
                        <div id="key" className="grid grid-cols-2 gap-x-3 gap-y-5">
                            <CalculatorKey color="bg-aaa" radius="rounded-[50%]" onPress={() => performOperation('+')} label='×' width={"w-[45px]"} font={"text-[32px]"} />
                            <CalculatorKey color="bg-aaa" radius="rounded-[50%]" onPress={() => performOperation('+')} label='÷' width={"w-[45px]"} font={"text-[32px]"} />
                            <CalculatorKey color="bg-aaa" radius="rounded-[50%]" onPress={() => performOperation('+')} label='+' width={"w-[45px]"} font={"text-[32px]"} />
                            <CalculatorKey color="bg-aaa" radius="rounded-[50%]" onPress={() => performOperation('+')} label='-' width={"w-[45px]"} font={"text-[32px]"} />
                            <CalculatorKey color="bg-aaa" radius="rounded-[50%]" onPress={() => performOperation('+')} label='%' width={"w-[45px]"} font={"text-[24px]"} />
                            <CalculatorKey color="bg-aaa" radius="rounded-[50%]" onPress={() => performOperation('+')} label='^' width={"w-[45px]"} font={"text-[24px]"} />
                            <div className="col-span-2">
                                <CalculatorKey color="bg-bbb" radius="rounded-[100px]" onPress={() => performOperation('+')} label='=' width={"w-[100%]"} font={"text-[28px]"} />
                            </div>
                        </div>


                    </div>
                    {/* <div className="mb-[20px]">
                        <CalculatorKey color="bg-main" radius="rounded-[20px]" onPress={() => inputDot()} label='.' />
                        <CalculatorKey color="bg-bbb" radius="rounded-[20px]" onPress={() => performOperation('=')} label='=' />
                    </div> */}
                </div>
            </div>
        </>
    )
}