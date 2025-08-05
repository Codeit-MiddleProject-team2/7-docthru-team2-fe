import { useState } from "react";

function Option({ text, setValue, setOpen }) {
  const handleOption = () => {
    setValue(text);
    setOpen(false);
  };

  return <div onClick={handleOption}>{text}</div>;
}

export default function DropOption({ value, setValue }) {
  const [isDropOpen, setIsDropOpen] = useState(false);

  return (
    <div style={{ backgroundColor: "gray", padding: "20px", color: "white" }}>
      <div>문서 타입</div>
      <div>
        <div
          onClick={() => {
            setIsDropOpen(true);
          }}
        >
          {value}
        </div>
        {isDropOpen && (
          <div>
            <Option
              text="공식 문서"
              setValue={setValue}
              setOpen={setIsDropOpen}
            />
            <Option text="블로그" setValue={setValue} setOpen={setIsDropOpen} />
            <Option text="기타" setValue={setValue} setOpen={setIsDropOpen} />
          </div>
        )}
      </div>
    </div>
  );
}
