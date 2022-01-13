export default class EscPosEncoder {
  /**
   * Initialize the printer
   *
   * @return {object}          Return the object, for easy chaining commands
   *
   */
  initialize(): any;

  /**
   * Change the code page
   *
   * @param  {string}   value  The codepage that we set the printer to
   * @return {object}          Return the object, for easy chaining commands
   *
   */
  codepage(value: string): any;

  /**
   * Print text
   *
   * @param  {string}   value  Text that needs to be printed
   * @param  {number}   wrap   Wrap text after this many positions
   * @return {object}          Return the object, for easy chaining commands
   *
   */
  text(value: string, wrap: number): any;

  /**
   * Print a newline
   *
   * @return {object}          Return the object, for easy chaining commands
   *
   */
  newline(): any;

  /**
   * Print text, followed by a newline
   *
   * @param  {string}   value  Text that needs to be printed
   * @param  {number}   wrap   Wrap text after this many positions
   * @return {object}          Return the object, for easy chaining commands
   *
   */
  line(value: string, wrap: number): any;

  /**
   * Underline text
   *
   * @param  {boolean|number}   value  true to turn on underline, false to turn off, or 2 for double underline
   * @return {object}                  Return the object, for easy chaining commands
   *
   */
  underline(value: boolean): any;

  /**
   * Italic text
   *
   * @param  {boolean}          value  true to turn on italic, false to turn off
   * @return {object}                  Return the object, for easy chaining commands
   *
   */
  italic(value: boolean): any;

  /**
   * Bold text
   *
   * @param  {boolean}          value  true to turn on bold, false to turn off, or 2 for double underline
   * @return {object}                  Return the object, for easy chaining commands
   *
   */
  bold(value: boolean): any;

  /**
   * Change text size
   *
   * @param  {string}          value   small or normal
   * @return {object}                  Return the object, for easy chaining commands
   *
   */
  size(value: string): any;

  /**
   * Change text alignment
   *
   * @param  {string}          value   left, center or right
   * @return {object}                  Return the object, for easy chaining commands
   *
   */
  align(value: string): any;

  /**
   * Barcode
   *
   * @param  {string}           value  the value of the barcode
   * @param  {string}           symbology  the type of the barcode
   * @param  {number}           height  height of the barcode
   * @return {object}                  Return the object, for easy chaining commands
   *
   */
  barcode(value: string, symbology: string, height: number): any;

  /**
   * QR code
   *
   * @param  {string}           value  the value of the qr code
   * @param  {number}           model  model of the qrcode, either 1 or 2
   * @param  {number}           size   size of the qrcode, a value between 1 and 8
   * @param  {string}           errorlevel  the amount of error correction used, either 'l', 'm', 'q', 'h'
   * @return {object}                  Return the object, for easy chaining commands
   *
   */
  qrcode(value: string, model: number, size: number, errorlevel: string): any;

  /**
   * Image
   *
   * @param  {object}         element  an element, like a canvas or image that needs to be printed
   * @param  {number}         width  width of the image on the printer
   * @param  {number}         height  height of the image on the printer
   * @param  {string}         algorithm  the dithering algorithm for making the image black and white
   * @param  {number}         threshold  threshold for the dithering algorithm
   * @return {object}                  Return the object, for easy chaining commands
   *
   */
  image(
    element: any,
    width: number,
    height: number,
    algorithm: string,
    threshold: number
  ): any;

  /**
   * Cut paper
   *
   * @param  {string}          value   full or partial. When not specified a full cut will be assumed
   * @return {object}                  Return the object, for easy chaining commands
   *
   */
  cut(value: string): any;

  /**
   * Beeper sound functionality
   *
   * @return {object}                  Return the object, for easy chaining commands
   */
  beeper(): any;

  /**
   * Open cash drawer
   *
   * @return {object}                  Return the object, for easy chaining commands
   */
  openCashDrawer(): any;

  /**
   * Add raw printer commands
   *
   * @param  {array}           data   raw bytes to be included
   * @return {object}          Return the object, for easy chaining commands
   *
   */
  raw(data: any[]): any;

  /**
   * Encode all previous commands
   *
   * @return {Uint8Array}         Return the encoded bytes
   *
   */
  encode(): any;
}
