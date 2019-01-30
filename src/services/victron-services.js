/**
 * This file contains the node specific dbus service mappings
 * and related helper functions.
 */


/**
 * Generates a unique hash from the given string.
 * This is used to identify services from each other.
 *
 * @param {string} str a string the hash is generated from
 */
function getHash(str){
    return str
        .split('')
        .reduce((a, b) => {
            a = (( a << 5 ) - a) + b.charCodeAt(0)
            return a & a
        }, 0)
}

/**
 * Constructs a battery object that is returned by
 * configuration node's /victron/services REST endpoint.
 * This is used to build battery node's edit options.
 */
const BATTERY = (service, name, paths) => {
    return {
        "service": `${service}`,
        "name": `${name}`,
        "id": getHash(service),
        "paths": paths
    }
}

/**
 * All available battery node measurements.
 * This array is filtered against the systemconfiguration cache.
 */
const BATTERY_PATHS = [
    {
        "name": "Voltage 1 (V)",
        "path": "/Dc/0/Voltage"
    },
    {
        "name": "Voltage 2 (V)",
        "path": "/Dc/1/Voltage"
    },
    {
        "name": "Current (A)",
        "path": "/Dc/0/Current"
    },
    {
        "name": "Temperature (°C)",
        "path": "/Dc/0/Temperature"
    },
    {
        "name": "Consumed Charge (Ah)",
        "path": "/ConsumedAmphours"
    },
    {
        "name": "State of Charge (%)",
        "path": "/Soc"
    },
    {
        "name": "Time to Go (s)",
        "path": "/TimeToGo"
    },
    {
        "name": "Relay State (on/off)",
        "path": "/Relay/0/State"
    }
]

/**
 * Constructs a relay object, that is
 * used to build the relay node's edit options.
 */
const RELAY = (service, path, name) => {
        return {
            "service": `${service}`,
            "name": `${name}`,
            "id": getHash(service + path),
            "paths": [
                {
                    "name": "State (on/off)",
                    "path": `${path}`
                }
            ]
        }
}

const RELAY_FUNCTIONS = {
    0: 'alarm',
    1: 'generator',
    2: 'manual',
    3: 'tank pump'
}

const RELAY_MODE_WARNING = (func) =>
    `This relay is reserved for ${func} function. Please navigate to Settings > Relay and change it to manual.`

module.exports = {
    BATTERY,
    BATTERY_PATHS,
    RELAY,
    RELAY_FUNCTIONS,
    RELAY_MODE_WARNING
}