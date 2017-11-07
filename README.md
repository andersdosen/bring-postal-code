# Bring Postal Code
Look up the city of a postal code and put it into the city input field.

## Usage
1. Add the class `bring-zip` to the zip input field
2. Add the class `bring-result` to the city input field
3. Initialize by running `bringPostalCode();`

### Countries
`bringPostalCode()` accepts the `country` parameter. The following countries are supported:
Code | Country
--- | ---
NO | Norway _(Default)_
DK | Denmark
SE | Sweden
FI | Finland
NL | Netherlands
DE | Germany
US | United States
BE | Belgium
FO | Faroe Islands
GL | Greenland

Example: `bringPostalCode({ country: 'SE' });` for Swedish cities.

***

Made possible by the [Postal Code API by Bring](https://developer.bring.com/api/postal-code/)

[![Bring logo](logo-bring.svg "Bring logo")](https://developer.bring.com/)
