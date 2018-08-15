cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-android-permissions/www/permissions.js",
        "id": "cordova-plugin-android-permissions.Permissions",
        "clobbers": [
            "cordova.plugins.permissions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-contacts-phonenumbers/www/contactsPhoneNumbers.js",
        "id": "cordova-plugin-contacts-phonenumbers.contactsPhoneNumbers",
        "clobbers": [
            "navigator.contactsPhoneNumbers"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{}
// BOTTOM OF METADATA
});