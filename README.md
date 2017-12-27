[![Build Status](https://travis-ci.org/FabricElements/fabric-location.svg?branch=master)](https://travis-ci.org/FabricElements/fabric-location)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/FabricElements/fabric-location)

## \<fabric-location\>

`fabric-location` is a [Polymer 2](http://polymer-project.org) element that provides information about the device's geolocation.

## Installation

Install fabric-location with Bower

```shell
$ bower install --save FabricElements/fabric-location
```

## Usage

Import it into the `<head>` of your page

```html
<link rel="import" href="bower_components/fabric-location/fabric-location.html">
```

### Example: basic usage

```html
<fabric-location 
  auto
  supported="{{supported}}"
  position="{{position}}"
  longitude="{{longitude}}"
  latitude="{{latitude}}"
  error="{{error}}"
  permissions="{{permissions}}"
  granted="{{granted}}"
></fabric-location>
```

* `auto` (boolean) - Check position when ready.
* `supported` (boolean) - Disable email input on sign-up form. 
* `position` (object) - Geolocation API position object.
* `longitude` (number) - The longitude of the current position.
* `latitude` (number) - The latitude of the current position.
* `permissions` (string) - Current permissions state, could be granted, prompt, denied or unknown.
* `granted` (boolean) - Permissions granted.

### Other attributes

* `highAccuracy` (boolean) - Enables high accuracy GPS.
* `timeout` (number) - The timeout option in the Gelocation API.
* `listen` (boolean) - Update latitude/longitude as the device changes.

### Events

* `error-changed` - Fired when the `error` property has changed.
* `latitude-changed` - Fired when the `latitude` property has changed.
* `longitude-changed` - Fired when the `longitude` property has changed.
* `permissions-changed` - Fired when the `permissions` property has changed.
* `granted-changed` - Fired when the `granted` property has changed.
* `position-changed` - Fired when the `position` property has changed.
* `supported-changed` - Fired when the `supported` property has changed.

## Contributing

Please check [CONTRIBUTING](./CONTRIBUTING.md).

## License

Released under the [BSD 3-Clause License](./LICENSE.md).
