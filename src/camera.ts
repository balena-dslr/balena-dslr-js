import { Camera, run } from '@typedproject/gphoto2-driver';
import { sleep } from './utils';

export default class CameraActions {
    private camera: Camera;
    constructor() {
        this.camera = Camera.listen();
    }
    /**
     * Do various capture actions
     * 
     * @param autoFocus Should the camera start to autofocus? (May never finish and lock up camera!)
     * @param preview Capture a preview image and save it to the sd card?
     * @param capture Save a image in full quality to the sd card
     */
    public capture(autoFocus = false, preview = false, capture = false) {
        if (this.camera.isClosed()) {
            this.camera = Camera.listen();
        }
        return run(async () => {
            await sleep(2000);

            if (autoFocus) {
                console.info("Autofocus =============================");
                this.camera.autoFocus();

                await sleep(20000);
            }

            if (preview) {
                console.info("Preview ===============================");

                this.camera.widgets.apply({
                    "/settings/capturetarget": "Memory card",
                });

                const res = await this.camera.capturePreviewAsync();
                res?.close();

                console.info("File saved");
            }

            if (capture) {
                console.info("Capture ===============================");

                this.camera.widgets.apply({
                    "/settings/capturetarget": "Memory card",
                });

                const res = await this.camera.captureImageAsync();
                res?.close();
                console.info("File saved");
            }
        });
    }

    /**
     * Start a timelapse capture
     * 
     * @param interval_ms The amount of time in between a capture being done in miliseconds
     * @param frames The number of frames to overall take
     * @param autoExpose If we should try to auto adjust for changing exposure
     */
    public async run_timelapse(interval_ms: number, frames: number, autoExpose: boolean) {
        if (this.camera.isClosed()) {
            this.camera = Camera.listen();
        }

        let current_frame = 1;

        await sleep(2000);
        return run(async () => {
            while (current_frame <= frames) {

                console.info("Capture ===============================");

                this.camera.widgets.apply({
                    "/settings/capturetarget": "Memory card",
                });

                const res = await this.camera.captureImageAsync();
                res?.close();

                console.info("File saved ============================");

                if (autoExpose) {
                    // TODO change exposure to the next step if needed
                }

                await sleep(interval_ms);
            }
        });
    }
}