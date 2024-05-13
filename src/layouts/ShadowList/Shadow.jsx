import { useState, useEffect } from "react";
import chevron from "../../assets/chevron.svg";
import ShadowRange from "./ShadowRange";
import ShadowColorPicker from "./ShadowColorPicker";
import ShadowCheckbox from "./ShadowCheckbox";
import { removeShadow } from "../../features/shadows"
import { useDispatch } from "react-redux"

export default function Shadow({ panelNumber, shadow }) {
  const dispatch = useDispatch()
  const [toggleShodow, setToggleShodow] = useState(false);

  useEffect(() => {
    if (panelNumber === 1) setToggleShodow(true);
  }, []);

  const shadowInputs = shadow.inputs.map((input, index) => {
    if (input.type === "range") {
      return (
        <ShadowRange
          key={index}
          inputData={shadow.inputs[index]}
          shadowID={shadow.id}
        />
      );
    } else if (input.type === "color") {
      return (
        <ShadowColorPicker
          key={index}
          inputData={shadow.inputs[index]}
          shadowID={shadow.id}
        />
      );
    }
  });

  return (
    <li className="bg-gray-50 border-b border-gray-300">
      <button
        className="w-full px-6 py-2 flex justify-between items-center hover:bg-gray-100"
        onClick={() => setToggleShodow(!toggleShodow)}
      >
        <span>Shadow {panelNumber}</span>
        <img
          style={{
            transform: `${toggleShodow ? "rotate(90deg)" : "rotate(0deg)"}`,
          }}
          className="font-bold w-5"
          src={chevron}
          alt="Chevron"
        />
      </button>
      {toggleShodow && (
        <>
          <div className="flex items-center px-6 py-4">
            <ShadowCheckbox name={"active"} shadowID={shadow.id} />
            <ShadowCheckbox name={"inset"} shadowID={shadow.id} />

            <button 
              onClick={() => dispatch(removeShadow(shadow.id))}
              className="ml-auto text-sm bg-red-600 text-white hover:bg-red-700 py-1 px-3 rounded">
              Remove
            </button>
          </div>
          <div className="px-6 py-4">{shadowInputs}</div>
        </>
      )}
    </li>
  );
}
