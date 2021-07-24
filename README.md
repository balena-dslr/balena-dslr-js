# balena-DSLR

You can use this project to remotely control your DSLR camera via BLE using balena to manage the raspberry pi zero w.

## Hardware

| Hardware required | Notes | 
| :--: | :--: |
| A Raspberry Pi Zero W | You also need a way to connect your camera via usb and a phone capable of running Bluetooth Low Energy|
| A DSLR camera | This project uses `gphoto2` to communicate with the cameras. See supported cameras [here](http://gphoto.org/proj/libgphoto2/support.php)|

## Notes

This project is still very early in development please report any bugs.

There isnt yet a client available. You will need to manually send the commands to the BLE service.

The project is only tested on a Canon EOS 4000D/Rebel T100.

This project eventually is going to get a rust rewrite to reduce performance overhead.

The images get saved on to the cameras sd card as downloading them with the nodejs lib does lock up my camera. (gphoto2 cli doesnt)