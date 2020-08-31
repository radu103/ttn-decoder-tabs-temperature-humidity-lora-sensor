/* 
 * Decoder function for The Things Network to unpack the payload of the tabs sensor for temperature and humidity
 *
 * This function was created by Radu Simen - radu103@hotmail.com
 */

function Decoder(bytes, port) {

    var params = {
        "bytes": bytes
    };

    // Humidity Measurement
    var rh = bytes[3] &= 0x7f;
    var rh_error = false;
    if (rh === 127) {
        rh_error = true;
    } else {
        rh_error = false;
    }
    
    // Board temp measurement
    var temp = bytes[2] & 0x7f;
    temp = temp - 32;

    // Battery measurements
    var battv = bytes[1] & 0x0f;
    battv = (25 + battv) / 10;

    var battp = bytes[1] & 0x0f;
    var k = bytes[1] >> 4;
    battp = 100 * (k / 15);

    params.humidity_percent = rh;
    params.humidity_error = rh_error;
    params.temp_celsius = temp;
    params.batt_voltage = battv;
    params.batt_percent = battp;

    return params;
}