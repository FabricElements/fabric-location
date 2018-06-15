import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './location-mixin.js';
/**
 * `fabric-location`
 *
 * @customElement
 * @polymer
 * @appliesMixin Fabric.LocationMixin
 * @demo demo/index.html
 */
class FabricLocation extends Fabric.LocationMixin(PolymerElement) {
  /**
   * @return {!HTMLTemplateElement}
   */
  static get template() {
    return html`
    <style>
      :host {
        display: none;
      }
    </style>
`;
  }

  /**
   * @return {string}
   */
  static get is() {
    return 'fabric-location';
  }
}

window.customElements.define(FabricLocation.is, FabricLocation);
