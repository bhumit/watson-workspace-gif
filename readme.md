# IBM Watson Workspace Gif App
This app allows users to post gifs in space. Just type `@gif` plus a word or phrase (such as `@gif awesome`) and Gif app will post a random GIF that matches. Also responds to slash commands. Supports giphy.com links. The uses [IBM Watson Workspace Bot Framework]() and [IBM Watson Workspace SDK](https://github.com/van-ibm/watsonworkspace-sdk).

![gifapp](https://user-images.githubusercontent.com/1700450/33235000-e7b4635e-d227-11e7-8555-f6647078c96f.gif)


**IMPORTANT UPDATES**

* The latest developer URL is [https://developer.watsonwork.ibm.com/apps](https://developer.watsonwork.ibm.com/apps).
* The SDK now mounts your bot on the path `/APP_ID`. For example, `https://cdf9d82f.ngrok.io/a7cfbdac-cdab-3d6f-ae13-0654b6b8e880`. The video shows the older mount path as `/`.


## Deploy to IBM Cloud
[![Deploy to IBM Cloud](https://metrics-tracker.mybluemix.net/stats/workspace/button.svg)](https://bluemix.net/deploy?repository=https://github.com/bhumitpatel/watsonworkspace-gif.git)

## Quick Start

1. Open a command line (terminal) and change directory to the `watsonworkspace-gif` directory.
2. Install dependencies by running `npm install`.
3. Create a `.env` file per the dotenv instructions in Local Development documentation.
4. Run `npm run-script dev` from a command line.
5. Copy the URL seen in the `Use 'https://cdf9d82f.ngrok.io/<APP_ID>' as your webhook URL in Watson Workspace` message for later use.
6. Click the `Create new app` button on the [Developer Apps](https://developer.watsonwork.ibm.com/apps) page.
7. Enter the `App Name` and the `Description of App`.
8. Click `Create`.
9. The next dialog will give you the App ID and App secret. You need to save these values to the respective environment variables in the `.env` file called `APP_ID` and `APP_SECRET`.
10. Click on the `Listen to Events` link.
11. Click on the `Add an outbout webhook button`.
12. Give the webhook a name (any name will do) and select any of the events. The `message-created` and `message-annotation-added` events are particularly useful.
13. In the Webhook URL text box, specify the URL for your app you copied previously. For example, `https://cdf9d82f.ngrok.io/a7cfbdac-cdab-3d6f-ae13-0654b6b8e880`.
14. Copy the `Webhook secret` from the resulting dialog to the `WEBHOOK_SECRET` property in the `.env` file.
15. Make a change to `index.js` and save. This causes the chatbot to restart and load the updated `.env` file.
16. Back in you browser, select the `Enable` button to complete the process.
17. Follow the instructions in [Share App](https://workspace.ibm.com/developer/apps/dashboard/share) to add the app to a space.
18. Go write some code!