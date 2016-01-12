#Disable WebRTC Indicator Overlay
Removes the floating overlay with the firefox and camera icons that is displayed when the webcam or microphone are accessed over webrtc. This add-on is meant for use in special enviroments like embedded applications or kiosk systems and should otherwise because of the resulting privacy and security issues.

## Installation
You can get the add-on [here](xpi/disable_webrtc_indicator_overlay-0.1.3-fx+an.xpi)

## Removing the Permissions Popup
In case you also wish to remove the popup that asks for permission to use camera/microphone, you can set `media.navigator.permission.disabled = true` in `about:conifg`. Hower, this should also only be done in controlled enviroments.

## Security and Privacy Implications
Please consider that there is a reason that the developers introduced these measures. Especially the combination of the two options can have serious security implications, because any website could listen to your microphone and camera without you even noticing. Only use both options in controlled enviroments and jus the addon only when its really necessary for your application.
