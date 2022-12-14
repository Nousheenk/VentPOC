/* eslint-disable no-shadow */
'use strict';
import React from 'react';
import {NativeModules} from 'react-native';
const BleManagerModule = NativeModules.BleManager;

class BleManager {
  constructor() {
    this.isPeripheralConnected = this.isPeripheralConnected.bind(this);
  }

  read(peripheralId, serviceUUID, characteristicUUID) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.read(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            fulfill(data);
          }
        },
      );
    });
  }

  readRSSI(peripheralId) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.readRSSI(peripheralId, (error, rssi) => {
        if (error) {
          reject(error);
        } else {
          fulfill(rssi);
        }
      });
    });
  }

  refreshCache(peripheralId) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.refreshCache(peripheralId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          fulfill(result);
        }
      });
    });
  }

  retrieveServices(peripheralId, services) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.retrieveServices(
        peripheralId,
        services,
        (error, peripheral) => {
          if (error) {
            reject(error);
          } else {
            fulfill(peripheral);
          }
        },
      );
    });
  }

  write(peripheralId, serviceUUID, characteristicUUID, data, maxByteSize) {
    if (maxByteSize == null) {
      maxByteSize = 20;
    }
    return new Promise((fulfill, reject) => {
      BleManagerModule.write(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        data,
        maxByteSize,
        error => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  writeWithoutResponse(
    peripheralId,
    serviceUUID,
    characteristicUUID,
    data,
    maxByteSize,
    queueSleepTime,
  ) {
    if (maxByteSize == null) {
      maxByteSize = 20;
    }
    if (queueSleepTime == null) {
      queueSleepTime = 10;
    }
    return new Promise((fulfill, reject) => {
      BleManagerModule.writeWithoutResponse(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        data,
        maxByteSize,
        queueSleepTime,
        error => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  connect(peripheralId) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.connect(peripheralId, error => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  createBond(peripheralId, peripheralPin = null) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.createBond(peripheralId, peripheralPin, error => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  removeBond(peripheralId) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.removeBond(peripheralId, error => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  disconnect(peripheralId, force = true) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.disconnect(peripheralId, force, error => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  startNotification(peripheralId, serviceUUID, characteristicUUID) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.startNotification(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        error => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  startNotificationUseBuffer(
    peripheralId,
    serviceUUID,
    characteristicUUID,
    buffer,
  ) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.startNotificationUseBuffer(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        buffer,
        error => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  stopNotification(peripheralId, serviceUUID, characteristicUUID) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.stopNotification(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        error => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  checkState() {
    BleManagerModule.checkState();
  }

  start(options) {
    return new Promise((fulfill, reject) => {
      if (options == null) {
        options = {};
      }
      BleManagerModule.start(options, error => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  scan(serviceUUIDs, seconds, allowDuplicates, scanningOptions = {}) {
    return new Promise((fulfill, reject) => {
      if (allowDuplicates == null) {
        allowDuplicates = false;
      }

      // (ANDROID) Match as many advertisement per filter as hw could allow
      // dependes on current capability and availability of the resources in hw.
      if (scanningOptions.numberOfMatches == null) {
        scanningOptions.numberOfMatches = 3;
      }

      // (ANDROID) Defaults to MATCH_MODE_AGGRESSIVE
      if (scanningOptions.matchMode == null) {
        scanningOptions.matchMode = 1;
      }

      // (ANDROID) Defaults to SCAN_MODE_LOW_POWER on android
      if (scanningOptions.scanMode == null) {
        scanningOptions.scanMode = 0;
      }

      if (scanningOptions.reportDelay == null) {
        scanningOptions.reportDelay = 0;
      }

      BleManagerModule.scan(
        serviceUUIDs,
        seconds,
        allowDuplicates,
        scanningOptions,
        error => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  stopScan() {
    return new Promise((fulfill, reject) => {
      BleManagerModule.stopScan(error => {
        if (error != null) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  enableBluetooth() {
    return new Promise((fulfill, reject) => {
      BleManagerModule.enableBluetooth(error => {
        if (error != null) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  getConnectedPeripherals(serviceUUIDs) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.getConnectedPeripherals(
        serviceUUIDs,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            if (result != null) {
              fulfill(result);
            } else {
              fulfill([]);
            }
          }
        },
      );
    });
  }

  getBondedPeripherals() {
    return new Promise((fulfill, reject) => {
      BleManagerModule.getBondedPeripherals((error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result != null) {
            fulfill(result);
          } else {
            fulfill([]);
          }
        }
      });
    });
  }

  getDiscoveredPeripherals() {
    return new Promise((fulfill, reject) => {
      BleManagerModule.getDiscoveredPeripherals((error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result != null) {
            fulfill(result);
          } else {
            fulfill([]);
          }
        }
      });
    });
  }

  removePeripheral(peripheralId) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.removePeripheral(peripheralId, error => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  isPeripheralConnected(peripheralId, serviceUUIDs) {
    return this.getConnectedPeripherals(serviceUUIDs).then(result => {
      if (
        result.find(p => {
          return p.id === peripheralId;
        })
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  requestConnectionPriority(peripheralId, connectionPriority) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.requestConnectionPriority(
        peripheralId,
        connectionPriority,
        (error, status) => {
          if (error) {
            reject(error);
          } else {
            fulfill(status);
          }
        },
      );
    });
  }

  requestMTU(peripheralId, mtu) {
    return new Promise((fulfill, reject) => {
      BleManagerModule.requestMTU(peripheralId, mtu, (error, mtu) => {
        if (error) {
          reject(error);
        } else {
          fulfill(mtu);
        }
      });
    });
  }

  setName(name) {
    BleManagerModule.setName(name);
  }
}

module.exports = new BleManager();
