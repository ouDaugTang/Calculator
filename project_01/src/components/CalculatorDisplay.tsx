interface Props {
    value: string;
    shadow: string;
}
export const CalculatorDisplay = ({ value, shadow }: Props) => {
    return (
        <div className=" shadow-custom w-full text-right bg-main rounded-main_sub w-[350px] h-[70px] pr-8 flex justify-end items-center">
            <h1 className="text-[#fff] text-3xl">
                {value}
            </h1>
        </div>
    )
}