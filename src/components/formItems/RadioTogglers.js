import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RadioTogglers({ options, defaultValue, onChange }) {
  return (
    <div className="radio-togglers shadow">
      {options.map((option) => (
        <label key={option.value} className="">
          <input
            type="radio"
            name="bgType"
            onClick={(ev) => onChange(ev.target.value)}
            defaultChecked={defaultValue === option.value}
            value={option.value}
            className=""
          />
          <div className="">
            <FontAwesomeIcon icon={option.icon} className="text-amber-600" />
            <span className="">{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
}
