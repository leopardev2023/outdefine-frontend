import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import countries from 'countries-list';

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

export class CitiesAutocomplete extends React.Component<PropsType, StateTypes> {
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
    this.props.handleSelect(address.split(',').slice(0, -1).join(', '));
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
                placeholder: 'Search Cities...',
                className:
                  this.props.inputClass ??
                  'city-search-input w-[312px] h-[46px] text-[14px] border-none bg-white shadow-3xl rounded-[15px] mt-6 px-4',
              })}
            />
            <div
              className={
                this.props.listClass ??
                'autocomplete-dropdown-container absolute z-10 bg-white w-[312px] max-h-64 rounded-[15px] mt-2 overflow-y-auto shadow-3xl'
              }
            >
              {loading && <div className='bg-white'>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'bg-theme text-white rounded-[15px]'
                  : 'bg-white text-black';
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className:
                        className +
                        ' flex items-center w-full px-4 h-[46px] bg-white cursor-pointer overflow-x-hidden',
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
      </PlacesAutocomplete>
    );
  }
}
