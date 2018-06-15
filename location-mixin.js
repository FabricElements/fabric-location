import '@polymer/polymer/polymer-element.js';
window.Fabric = window.Fabric || {};

/**
 * Fabric.LocationMixin
 *
 * @polymerMixin Fabric.LocationMixin
 * @memberOf Fabric
 * @constructor
 * @summary Custom element base class that provides the core API for
 * @property {boolean} baseClass
 * @param {Function} baseClass
 */
Fabric.LocationMixin = (baseClass) => {
  return class extends baseClass {
    /**
     * @return {object}
     */
    static get properties() {
      return {
        /*
         * Check for position when ready
         */
        auto: {
          type: Boolean,
          value: false,
        },
        /*
         * Disable email input on sign-up form
         */
        disabled: {
          type: Boolean,
          value: false,
        },
        /**
         * Error
         */
        error: {
          type: Object,
          notify: true,
          readOnly: true,
          reflectToAttribute: true,
          value: null,
        },
        /**
         * If true, enables high accuracy GPS.
         */
        highAccuracy: {
          type: Boolean,
          value: false,
        },
        /**
         * The latitude of the current position.
         */
        latitude: {
          type: Number,
          notify: true,
          readOnly: true,
          reflectToAttribute: true,
          value: null,
        },
        /**
         * The longitude of the current position.
         */
        longitude: {
          type: Number,
          notify: true,
          readOnly: true,
          reflectToAttribute: true,
          value: null,
        },
        /**
         * The maximumAge option in the Gelocation API.
         */
        maximumAge: {
          type: Number,
          value: 0,
        },
        /**
         * Current permissions state:
         * granted, prompt, denied or unknown
         */
        permissions: {
          type: String,
          notify: true,
          readOnly: true,
          reflectToAttribute: true,
          value: null,
        },
        /*
         * Permissions granted
         */
        granted: {
          type: Boolean,
          notify: true,
          readOnly: true,
          reflectToAttribute: true,
          value: false,
          computed: '_computeGranted(permissions)',
        },
        /**
         * Geolocation API position object
         */
        position: {
          type: Object,
          notify: true,
          readOnly: true,
          reflectToAttribute: true,
          value: null,
        },
        /*
         * Disable email input on sign-up form
         */
        supported: {
          type: Boolean,
          notify: true,
          readOnly: true,
          reflectToAttribute: true,
          value: false,
        },
        /**
         * The timeout option in the Gelocation API.
         */
        timeout: {
          type: Number,
          value: 10000,
        },
        /**
         * If true, the latitude/longitude update as the device changes
         * position. If not set, the latitude/longitude are provided once.
         */
        listen: {
          type: Boolean,
          value: false,
        },
        /**
         * listen for changes
         */
        _listen: {
          type: Function,
        },
      };
    }

    /**
     * Connected callback
     */
    connectedCallback() {
      super.connectedCallback();
      this._setSupported(!!navigator.geolocation);
      this._checkPermissions();
    }

    /**
     * Disconnected callback
     */
    disconnectedCallback() {
      super.disconnectedCallback();
      this._clearlisten();
    }

    /**
     * @return {array}
     */
    static get observers() {
      return [
        // eslint-disable-next-line max-len
        '_listen(auto, permissions, supported, disabled, highAccuracy, timeout, maximumAge,)',
      ];
    }

    /**
     * Check for location
     */
    check() {
      this._clearlisten();
      if (!this.supported || this.disabled) {
        return;
      }
      const success = this._onSuccess.bind(this);
      const error = this._onError.bind(this);
      const options = {
        enableHighAccuracy: this.highAccuracy,
        timeout: this.timeout,
        maximumAge: this.maximumAge,
      };
      if (this.listen) {
        // eslint-disable-next-line max-len
        this._listen = navigator.geolocation.watchPosition(success, error, options);
      } else {
        navigator.geolocation.getCurrentPosition(success, error, options);
      }
    }

    /**
     * Success callback when the Geolocation API returns results.
     *
     * @param {Position} pos A position object from the Geolocation API.
     */
    _onSuccess(pos) {
      this.reset();
      this._setPermissions('granted');
      this._setPosition(pos);
      this._setLatitude(pos.coords.latitude);
      this._setLongitude(pos.coords.longitude);
    }

    /**
     * Error callback when the Geolocation API returns an error.
     *
     * @param {Position} err The error that was returned.
     */
    _onError(err) {
      this.reset();
      this._setError(err);
    }

    /**
     * Stop updating latitude/longitude as the device changes position.
     * @param {Number} listen listen ID value.
     */
    _clearlisten() {
      if (this._listen) {
        navigator.geolocation.clearWatch(this._listen);
        this._listen = null;
      }
    }

    /**
     * Reset all values
     */
    reset() {
      this._setPosition(null);
      this._setLatitude(null);
      this._setLongitude(null);
      this._setError(null);
    }

    /**
     * Check for permissions
     * @private
     */
    _checkPermissions() {
      if (!navigator.permissions) {
        this._setPermissions('unknown');
        return;
      }
      navigator.permissions.query({
        name: 'geolocation',
      }).then((status) => {
        this._setPermissions(status.state);
        status.onchange = (event) => {
          this._setPermissions(event.target.state);
        };
      });
    }

    /**
     * Listen for option changes
     *
     * @param {boolean} auto
     * @param {string} permissions
     * @private
     */
    _listen(auto, permissions) {
      if (auto || permissions === 'granted' || permissions === 'unknown') {
        this.check();
      }
    }

    /**
     * Compute permissions granted
     *
     * @param {string|null} permissions
     * @return {boolean}
     * @private
     */
    _computeGranted(permissions) {
      return permissions === 'granted';
    }
  };
};
