# screen-capture-test #
Screen Capture for Chrome and Firefox
### For Google Chrome ###
* You must access **chrome://extensions** and enable the **Developer Mode**, and then click on **Load Unpacked Extension** and select the folder **screen-capture-chrome**.
After that you need to get the **ID** from your newly loaded extension and replace the variable **EXTENSION_ID** from the file **www/assets/js/index.js** on line **29** to your own EXTENSION_ID.

### For Firefox ###
* You don't have to change anything, however **it only works with HTTPS**. To test on localhost you can use [ngrok](https://ngrok.com/ "ngrok").

###### Detail ######
On **screen-capture-chrome/manifest.json** you need to **change the second URI** to your own generated with **ngrok**.
