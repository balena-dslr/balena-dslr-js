import { PrimaryService, Characteristic } from 'bleno';
import CameraActions from './camera';
class BLEService extends Characteristic {
    private _value: Buffer;
    private _updateValueCallback: any;
    private camera: CameraActions;

    constructor() {
        super({
            uuid: '14444444444444444444444444444448',
            properties: ['write', 'notify'],
            value: null
        });
        this.camera = new CameraActions();
        this._value = Buffer.alloc(0);
        this._updateValueCallback = null;
    }

    onWriteRequest(data: Buffer, _offset: number, _withoutResponse: boolean, callback: (result: number) => void) {
        this._value = data;
        console.log(this._value.toString());
        // TODO use json instead
        switch (this._value.toString()) {
            case "capture":
                this.camera.capture(
                    false,
                    false,
                    true
                );
                break;
            case "timelapse":
                this.camera.run_timelapse(
                    20000,
                    1500,
                    false
                );
                break;
        }


        if (this._updateValueCallback) {
            this._updateValueCallback(this._value);
        }

        callback(Characteristic.RESULT_SUCCESS);
    }

    onSubscribe(_maxValueSize: number, updateValueCallback: any) {
        this._updateValueCallback = updateValueCallback;
    }

    onUnsubscribefunction() {
        this._updateValueCallback = null;
    }
}

export const bleService = new PrimaryService({ uuid: '14444444444444444444444444444447', characteristics: [new BLEService()] })