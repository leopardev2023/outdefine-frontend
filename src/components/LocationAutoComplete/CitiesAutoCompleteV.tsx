import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import countries from 'countries-list';
import { isEmpty } from '@aws-amplify/core';

interface PropsType {
  value: string;
  inputClass?: string;
  listClass?: string;
  labelClass?: string;
  country: string;
  handleSelect: (address: string) => void;
  title: string;
}

interface StateTypes {
  address: string;
  countryCode: string;
  searchOptions: Record<any, any>;
}

export class CitiesAutocompleteV extends React.Component<
  PropsType,
  StateTypes
> {
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
    };
  }

  handleChange = (address) => {
    this.props.handleSelect(address);
  };

  handleSelect = (address) => {
    this.props.handleSelect(address);
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
          <div className='places-auto-complete font-inter relative'>
            <div
              className={
                this.props.labelClass ??
                'font-medium text-[18px] leading-[150%] font-poppins'
              }
            >
              {this.props.title}
            </div>
            <input
              {...getInputProps({
                placeholder: 'Type a city',
                className:
                  `city-search-input w-full h-12 text-sm rounded-lg px-4 border border-[#F4F4F4] bg-[#F0F1F2] focus:border-darker-gray hover:border-[1px] hover:border-darker-gray transition-all duration-800  ${
                    this.props.value?.length &&
                    'border-[1px] !border-black !bg-lighter-gray '
                  } ` + (this.props.inputClass ?? ''),
              })}
            />
            {suggestions?.length > 0 && (
              <div
                className={
                  this.props.listClass ??
                  'autocomplete-dropdown-container shadow-md font-inter absolute z-10 bg-white w-full max-h-64 rounded-[8px] overflow-y-auto mt-3 px-2 py-3'
                }
              >
                {loading && <div className='bg-white text-xs'>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'bg-odf-light rounded-[8px]'
                    : 'text-black';
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className:
                          className +
                          ' flex items-center w-full px-4 h-12 bg-white cursor-pointer overflow-x-hidden text-xs',
                      })}
                      key={suggestion.placeId}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
