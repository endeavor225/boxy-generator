import { useDispatch, useSelector } from "react-redux";
import { updateCheckBox } from "../../features/shadows";

export default function ShadowCheckbox({ name, shadowID }) {
  const dispatch = useDispatch();
  const checkboxShadow = useSelector((state) =>
    state.shadows.find((shadow) => shadow.id === shadowID)
  );
  return (
    <>
      <input
        onChange={() => dispatch(updateCheckBox({ shadowID, name }))}
        checked={checkboxShadow[name]}
        id={`checkbox-${name}-${shadowID}`}
        type="checkbox"
        className="h-4 w-4 border-gray-300 mr-2"
      />
      <label
        className="leading-4 mr-5"
        htmlFor={`checkbox-${name}-${shadowID}`}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
    </>
  );
}
