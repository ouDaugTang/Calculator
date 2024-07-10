interface Props {
    value: string;
}
export const CalculatorDisplay = ({ value }: Props) => {
    return (
        <div className="w-full text-right p-3 bg-main rounded-[20px] w-[350px] h-[70px]">
            <h1 className="text-[#fff] text-2xl">
                {value}
            </h1>
        </div>
    )
}