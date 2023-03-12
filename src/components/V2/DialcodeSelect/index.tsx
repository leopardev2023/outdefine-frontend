import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';

type CountrySelectPropsType = {
  value: string;
  onChange: Function;
  labels: Record<string, any>;
};

const CountrySelect = ({ value, onChange, labels, ...rest }: CountrySelectPropsType) => (
  <select {...rest} value={value} onChange={(event) => onChange(event.target.value || undefined)}>
    <option value=''>{labels['ZZ']}</option>
    {getCountries().map((country) => (
      <option key={country} value={country}>
        {labels[country]} +{getCountryCallingCode(country)}
      </option>
    ))}
  </select>
);

export default CountrySelect;
