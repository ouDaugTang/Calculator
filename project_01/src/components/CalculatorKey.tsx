
interface Props {
    onPress: () => void;
    bgc: string;
    font: string;
    radius: string;
    width: string;
    shadow: string;
    label: string;
    isHighlighted?: boolean;
}


export const CalculatorKey = ({ onPress, bgc, font, radius, width, shadow, label, isHighlighted}: Props) => {

    return (
        <button onClick={onPress} className={`${bgc} ${radius} ${width} ${shadow} h-[45px] flex justify-center items-center `}>
            {
                label == '' 
                ? <img src="/images/delete.png" alt="" /> 
                : <span className={`${font}  ${isHighlighted ? 'text-[#000000] ' : 'text-[#ffffff]'}` } >{label}</span>
            }
        </button>
    )
}