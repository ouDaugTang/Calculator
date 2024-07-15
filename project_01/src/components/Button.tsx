// Button 컴포넌트의 Props 인터페이스 정의
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

// Button 컴포넌트
export const Button = ({ onPress, bgc, font, radius, width, shadow, label, isHighlighted }: Props) => {
    return (
        <button onClick={onPress} className={`${bgc} ${radius} ${width} ${shadow} h-[45px] flex justify-center items-center`}>
            {
                label === '' 
                ? <img src="/images/delete.png" alt="" /> // 라벨이 빈 문자열일 경우 이미지 표시 (삭제 버튼)
                : <span className={`${font} ${isHighlighted ? 'text-[#000000]' : 'text-[#ffffff]'}`}>{label}</span> // 라벨이 있을 경우 텍스트 표시
            }
        </button>
    );
};
