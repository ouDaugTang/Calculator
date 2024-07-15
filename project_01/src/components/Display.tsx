// Display 컴포넌트의 Props 인터페이스 정의
interface Props {
    value: string;
    subValue: string;
}

// Display 컴포넌트
export const Display = ({ value, subValue }: Props) => {
    return (
        <div className="shadow-custom w-full text-right bg-main rounded-main_sub w-[350px] h-[70px] pr-8 flex-col justify-end items-center">
            <div className="text-[#b5b5b5] text-lg min-h-7">
                {subValue != '0' && subValue} 
            </div>
            <h1 className="text-[#fff] text-3xl">
                {value} 
            </h1>
        </div>
    );
};
