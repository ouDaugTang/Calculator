
interface Props {
    onPress: () => void;
    color: string;
    font: string;
    radius: string;
    width: string;
    label: string;
}


export const CalculatorKey = ({ onPress, color, font, radius, width, label }: Props) => {

    return (
        <button onClick={onPress} className={`${color} ${radius} ${width} text-white h-[45px] border flex justify-center items-center`}>
            {
                label == '' 
                ? <img src="/images/delete.png" alt="" /> 
                : <span className={`${font}`}>{label}</span>
            }
        </button>
    )
}