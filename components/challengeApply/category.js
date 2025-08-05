import { useState } from "react";
import { getCategory } from "@/mock/categoryMock";

export default function Category() {
  const [value, setValue] = useState("");

  const searchByValue = async () => {
    const res = await getCategory(value);
    console.log(res);
    return res;
  };

  return (
    <>
      <label>분야</label>
      <input value={value} onChange={searchByValue} />
      <div>
        <div>추천 분야</div>
      </div>
    </>
  );
}
