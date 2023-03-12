import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import countries from 'countries-list';
import InputV2 from '../Input/InputV2';
import { Controller } from 'react-hook-form';
import BadgeV2 from '../Badges/BadgeV2';

interface PropsType {
  icon?: any;
  value?: string;
  inputClass?: string;
  listClass?: string;
  country?: string;
  placeholder?: string;
  handleSelect?: (address: string) => void;
  validators?: Function[];
  disabled?: boolean;
  directionUp?: boolean;
}

interface StateTypes {
  address: string;
  countryCode: string;
  searchOptions: Record<any, any>;
  focus: boolean;
}

interface IFormCityInputV2 extends PropsType {
  name: string;
  control: any;
  rules?: Record<string, any>;
  withBadge?: boolean;
  badgeClass?: string;
  shouldUnregister?: boolean;
}

export const FormCityInputV2 = ({
  name,
  control,
  rules = {},
  withBadge = false,
  badgeClass = '',
  disabled = false,
  shouldUnregister = false,
  ...props
}: IFormCityInputV2) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, value } }) => (
        <div>
          <CityInputV2
            {...props}
            handleSelect={onChange}
            value={value}
            disabled={disabled}
          />
          {withBadge && !disabled && value ? (
            <BadgeV2 addClass={badgeClass}>{value}</BadgeV2>
          ) : null}
        </div>
      )}
    />
  );
};

export class CityInputV2 extends React.Component<PropsType, StateTypes> {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      countryCode: '',
      // title: 'City',
      searchOptions: {
        types: ['(cities)'],
        componentRestrictions: { country: '' },
      },
      focus: false,
    };
  }

  handleChange = (address) => {
    this.props.handleSelect && this.props.handleSelect(address);
  };

  handleSelect = (address) => {
    this.props.handleSelect && this.props.handleSelect(address);
    this.setState({
      focus: false,
    });
  };

  componentWillReceiveProps(nextProps) {
    const { country } = this.props;
    const filteredCountries = Object.entries(countries.countries).filter(
      (item) => item[1].name === country
    );

    const code = filteredCountries.length === 1 ? filteredCountries[0][0] : '';
    this.setState({
      searchOptions: {
        ...this.state.searchOptions,
        componentRestrictions: {
          country: code,
        },
      },
    });
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.props.value}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={this.state.searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='font-inter relative'>
            <InputV2
              icon={this.props.icon}
              {...getInputProps({
                placeholder: this.props.placeholder,
              })}
              validators={this.props.validators}
              onFocus={() =>
                this.setState({
                  focus: true,
                })
              }
              onBlur={() => {
                this.setState({
                  focus: false,
                });
              }}
              disabled={this.props.disabled}
            />

            {this.state.focus && suggestions.length > 0 && (
              <div
                className={
                  this.props.listClass ??
                  `autocomplete-dropdown-container absolute ${
                    this.props.directionUp ? 'bottom-16' : 'top-12'
                  } z-10 bg-white w-full rounded-lg shadow-lg pt-4 pb-2 pl-2 pr-1`
                }
              >
                <div className='max-h-64 overflow-y-auto pr-2'>
                  {loading && (
                    <div className='bg-white text-xs text-center py-5'>
                      Loading...
                    </div>
                  )}
                  {!loading &&
                    suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? 'bg-odf-light rounded-lg'
                        : '';
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className:
                              className +
                              ' flex items-center w-full px-4 h-[46px] bg-white cursor-pointer overflow-x-hidden text-xs font-inter',
                          })}
                          key={suggestion.placeId}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
