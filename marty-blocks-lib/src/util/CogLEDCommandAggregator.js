class CogLEDCommandAggregator {

    /**
     * Queue a LED change
     * @param {number} ledId - ID of the LED to update
     * @param {string} color - Hex color (e.g. 'FF0000')
     */
    static setLED(ledId, color) {
        CogLEDCommandAggregator.ledChanges[ledId] = color;
        CogLEDCommandAggregator.startTimer();
    }

    /**
     * Starts the interval loop to send updates
     */
    static startTimer() {
        if (CogLEDCommandAggregator.timer) return;

        CogLEDCommandAggregator.timer = setInterval(() => {
            if (Object.keys(CogLEDCommandAggregator.ledChanges).length === 0) return;

            const queryString = Object.entries(CogLEDCommandAggregator.ledChanges)
                .map(([ledId, color]) => {
                    const sanitizedColor = color.startsWith("#") ? color.slice(1) : color;
                    return `${ledId}=${sanitizedColor}`;
                })
                .join("&");

            const command = `led/ring/persist?${queryString}`;
            console.log("Sending LED command:", command);
            if (CogLEDCommandAggregator.sendFunction) {
                CogLEDCommandAggregator.sendFunction(command);
            }

            // Clear the buffer after sending
            CogLEDCommandAggregator.ledChanges = {};
        }, CogLEDCommandAggregator.updateInterval);
    }

    /**
     * Stops the interval timer and clears pending updates
     */
    static stop() {
        clearInterval(CogLEDCommandAggregator.timer);
        CogLEDCommandAggregator.timer = null;
        CogLEDCommandAggregator.ledChanges = {};
    }
}

CogLEDCommandAggregator.ledChanges = {};
CogLEDCommandAggregator.sendFunction = null;
CogLEDCommandAggregator.updateInterval = 50;
CogLEDCommandAggregator.timer = null;
window.CogLEDCommandAggregator = CogLEDCommandAggregator;
module.exports = CogLEDCommandAggregator;