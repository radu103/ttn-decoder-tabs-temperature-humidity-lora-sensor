/* 
 * Decoder function for The Things Network to unpack the payload of the tabs sensor for temperature and humidity
 *
 * This function was created by Radu Simen - radu103@hotmail.com
 */

function Decoder(bytes, port) {

    var params = {
        "bytes": bytes
    };
    
    // VOC Measurement
    var voc = (bytes[7] << 8) | bytes[6];
    var voc_error = false;
    if (voc === 65535) {
        voc_error = true;
        voc = null;
    } else {
        voc_error = false;
    }

    // CO2 Measurement
    var co2 = (bytes[5] << 8) | bytes[4];
    var co2_error = false;
    if (co2 === 65535) {
        co2_error = true;
        co2 = null;
    } else {
        co2_error = false;
    }

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

    params.voc = voc;
    params.voc_error = voc_error;
    params.co2 = co2;
    params.co2_error = co2_error;
    params.humidity_percent = rh;
    params.humidity_error = rh_error;
    params.temp_celsius = temp;
    params.batt_voltage = battv;
    params.batt_percent = battp;

    return params;
}