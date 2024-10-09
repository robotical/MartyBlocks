/**
 * @fileoverview
 * A class that manages the Raft devices -- making sure the correct device is selected when a block is clicked etc
 */

const { raftVerifiedSubscriptionHelper, raftDisconnectedSubscriptionHelper } = require('./util/raft-subscription-helpers');
const PublishedDataAnalyser = require('./cog/PublishedDataAnalyser').default;

class RaftManager {
    constructor() {
        this.raftIdAndDeviceIdMap = {};
        this.connectionButtons = {};
        this.subscriptions = {};
        this.raftIdToPublishedDataAnalyserMap = {};
    }

    addSubscription(deviceId, title, subscription) {
        if (!this.subscriptions[deviceId]) {
            this.subscriptions[deviceId] = {};
        }
        this.subscriptions[deviceId][title] = subscription;
        return subscription;
    }

    removeSubscription(deviceId, title) {
        if (this.subscriptions[deviceId]) {
            if (this.subscriptions[deviceId][title]) {
                this.subscriptions[deviceId][title].unsubscribe();
                delete this.subscriptions[deviceId][title];
            }
        }
    }

    removeSubscriptionsOfDevice(deviceId) {
        console.log("Removing subscriptions of device: ", deviceId);
        if (this.subscriptions[deviceId]) {
            for (const title in this.subscriptions[deviceId]) {
                this.removeSubscription(deviceId, title);
            }
        }
    }

    getSubscription(deviceId, title) {
        return this.subscriptions[deviceId][title];
    }

    connect(onVerifiedCb, onDisconnectedCb, deviceId) {
        const appManager = window.applicationManager;
        if (!appManager) {
            console.warn('appManager not defined');
        }
        appManager.connectGeneric((raft) => {
            // set subscription to raft events so we can update the UI when:
            // - the raft is connected
            // - the raft is disconnected
            this.addSubscription(deviceId || "temporary", 'verified', raftVerifiedSubscriptionHelper(raft)).subscribe(() => {
                onVerifiedCb(raft);

                if (raft.type === 'Cog') {
                    const publishedDataAnalyser = new PublishedDataAnalyser(raft);
                    this.raftIdToPublishedDataAnalyserMap[raft.id] = publishedDataAnalyser;
                }

                if (deviceId) {
                        this.raftIdAndDeviceIdMap[raft.id] = deviceId;
                        this.raftIdAndDeviceIdMap[deviceId] = raft.id;
                    }

                    // turn off the verified subscription to avoid memory leaks
                    this.removeSubscription(deviceId || "temporary", 'verified');

                    // Set up a subscription to the raft disconnected event
                    this.setupDisconnectSubscription(raft, onDisconnectedCb);
                })
        })
    }

    setupDisconnectSubscription(raft, onDisconnectedCb) {
        console.log("SETTING UP DISCONNECT SUBSCRIPTION IN RAFT MANAGER");
        this.addSubscription(raft.id, 'disconnected', raftDisconnectedSubscriptionHelper(raft)).subscribe(() => {
            onDisconnectedCb(raft);
            // window.cogManager.removeCog(raft);
             
            if (this.raftIdToPublishedDataAnalyserMap[raft.id]) {
                this.raftIdToPublishedDataAnalyserMap[raft.id].unsubscribeFromPublishedData();
            }

            // Remove the device id to raft id mapping
            const deviceId = this.raftIdAndDeviceIdMap[raft.id];
            if (deviceId) {
                this.removeDeviceIdRaftIdMap(deviceId, raft.id);
            }

            // Unsubscribe from the disconnected event to avoid memory leaks
            this.removeSubscription(raft.id, 'disconnected');
        });
    }

    disconnect(deviceId) {
        const appManager = window.applicationManager;
        if (!appManager) {
            console.warn('appManager not defined');
        }
        const raftId = this.raftIdAndDeviceIdMap[deviceId];
        const raft = appManager.connectedRafts[raftId];
        if (raft) {
            appManager.disconnectGeneric(raft);
        } else {
            console.error('raft not found for deviceId: ', deviceId);
        }
    }

    updateDeviceIdRaftIdMap(deviceId, raftId) {
        this.removeDeviceIdRaftIdMap(deviceId, raftId);
        this.raftIdAndDeviceIdMap[raftId] = deviceId;
        this.raftIdAndDeviceIdMap[deviceId] = raftId;
    }

    removeDeviceIdRaftIdMap(deviceId, raftId) {
        delete this.raftIdAndDeviceIdMap[raftId];
        delete this.raftIdAndDeviceIdMap[deviceId];
    }


    addConnectionButtonState(deviceId, connectionButton) {
        this.connectionButtons[deviceId] = connectionButton;
    }

    getConnectionButtonState(deviceId) {
        return this.connectionButtons[deviceId];
    }

    clearAllSubscriptions() {
        console.log("Clearing all subscriptions");
        for (const deviceId in this.subscriptions) {
            this.removeSubscriptionsOfDevice(deviceId);
        }
        this.subscriptions = {};
    }

    highlightDevice(deviceId) {
        const appManager = window.applicationManager;
        if (!appManager) {
            console.warn('appManager not defined');
        }
        const raftId = this.raftIdAndDeviceIdMap[deviceId];
        const raft = appManager.connectedRafts[raftId];
        if (raft) {
            raft.highlight();
        } else {
            console.warn('raft not found for deviceId: ', deviceId);
        }
    }

}

module.exports = RaftManager;