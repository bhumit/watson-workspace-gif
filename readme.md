# IBM Watson Workspace Gif App
This app allows users to post gifs in space. Just type `@gif` plus a word or phrase (such as `@gif awesome`) and Gif app will post a random GIF that matches. The Gif app also supports slash commands. It also parses giphy.com links embedded in a message. The uses [IBM Watson Workspace Bot Framework]() and [IBM Watson Workspace SDK](https://github.com/van-ibm/watsonworkspace-sdk).

## Quick Start with IBM Cloud
Let's get started! The steps below will outline the process from getting the app running within IBM Cloud to enable the app to post within a space based on the keyword trigger or slash commands.

Before jumping in, try accessing the links below to make sure you have access to Workspace, the developer experience for Watson Work Services, and IBM Cloud.
* [Watson Workspace](https://workspace.ibm.com)
* [Watson Work Services](https://developer.watsonwork.ibm.com)
* [IBM Cloud](https://bluemix.net)

### Deploy to IBM Cloud
First, let's get this app up and running on IBM Cloud. This will provide us with a publicly accessible endpoint that we can register with Watson Work Services to get events pushed to. To deploy to IBM Cloud, you can simply click the button below. This will create your own [IBM Cloud DevOps toolchain](https://console.bluemix.net/devops/getting-started?env_id=ibm:yp:us-south) in addition to deploying the app. As part of the toolchain, IBM Cloud will create a fork of this Github repository in your own github.com account for source control and a pipeline for building, testing, and deployment.

[![Deploy to IBM Cloud](https://metrics-tracker.mybluemix.net/stats/workspace/button.svg)](https://bluemix.net/deploy?repository=https://github.com/bhumit/watson-workspace-gif.git)

Once you've clicked the button, you'll get prompted with the following screens:

1. Define your `App name`, `Region`, `Organization` and `Space`.

  Most of the time you can keep the default values, but if you have multiple accounts/organizations/spaces in IBM Cloud, please make note of the values here to make sure the app is deployed where you'd like it to be.

![configure pipeline](https://user-images.githubusercontent.com/1700450/33242359-98f9310a-d2cb-11e7-8769-47d2f7a107fd.png)

  Click the **Create** button at the bottom of the screen to continue to the next step.

2. Once deployment and configuration has begun, you will be sent to the DevOps toolchain dashboard for your app:

![DevOps Dashboard](https://user-images.githubusercontent.com/1700450/33242365-c0f02614-d2cb-11e7-827e-e1660e407366.png)

  This will show you each of the "tools" that are provided in the tool chain.
  * The **Issues** block will take you to your own Github repository for this app. It will bring you to the issues section of this repository.
  * The **Github** block will also take you to the Github repository. This repository can be used like any git repository, included with the ability to automatically run the pipeline for any `git push`.
  * The **Eclipse Orion Web IDE** will take you to Eclipse's web-based editor, with the project connected to the git repository referenced above.
  * The **Delivery Pipeline** block will bring you to IBM Cloud's pipeline dashboard, which outlines each stage configured for the pipeline.

3. Click on the **Delivery Pipeline** block to see the current status of the deployment.

   When the deployment is done, the deploy stage will appear as below, with a green `Stage Passed` confirmation box.

   ![Delivery Pipeline](https://user-images.githubusercontent.com/1700450/33242385-1d13bdd4-d2cc-11e7-8988-c44b2184fade.png)

   **Note:** It may take a minute or two to deploy.
4. After the app is done deploying, click on the box under **Last Execution Result** to navigate to the deployed app.

    ![AppBlock](https://user-images.githubusercontent.com/1700450/33242389-2b343844-d2cc-11e7-8759-d77f8fd5b625.png)

5. The **Last Execution Result** block will take you to the App dashboard for the newly deployed app.

  ![App Dashboard](https://user-images.githubusercontent.com/1700450/33242395-522024ae-d2cc-11e7-8218-4beef451ea75.png)

  This dashboard shows the status of the app, the URL to access the app and provides the ability to interact with the app ( set environment variables, view logs, etc).

  **Take note of the app name at the top.** The app name is used to construct the URL for the running app: `https://<appname>.mybluemix.net`.

  ![image](https://user-images.githubusercontent.com/1700450/33242414-a16bab82-d2cc-11e7-82c8-a7a6807722b8.png)

  For example, in the screenshot above, the URL would be: `https://watsonworkspacegif-20170805194040469-random-keyword.mybluemix.net`

  Now let's register this app in Watson Work Services!

### Register app with Watson Work Services
An app must be registered with Watson Work Services in order to interact with the platform. The registration process provides the app with an id, secret and enables the app to request certain capabilities, such as listening to events in the system.

To register an app, navigate to the Watson Work Services developer experience: https://developer.watsonwork.ibm.com.

1. Once logged in, select the **Your Apps** link at the top right.

  ![WWS](https://user-images.githubusercontent.com/10982483/28998391-c69fd91a-79f7-11e7-9a17-b604b977b622.png)

2. From here, you should see a button to **Create new app**, as well as a list of apps if you have already created some.

  ![AppsList](https://user-images.githubusercontent.com/10982483/28998395-19411d8c-79f8-11e7-8210-e02127d0c2bf.png)

3. Click on **Create new app**.
   
   ![CreateNewApp](https://user-images.githubusercontent.com/1700450/33242238-85b2a7ea-d2c9-11e7-8940-f2ef745057cc.png)

    Provide any `App name` and `Description` that you'd like for your app and then click **Create**. This name will show up in Watson Work Services as the display name for your app.  

4. Once registered, you will be presented with the `id` and `secret` for the app.

    **Copy both the id and secret for later use.**
  
  ![SuccessDialog](https://user-images.githubusercontent.com/1700450/33242243-91cd1ab0-d2c9-11e7-95ba-3b8060bf397c.png)

5. After copying the id and secret, you will be sent to the App Dashboard for the newly registered Watson Work Services app.

  ![AppDashboard](https://user-images.githubusercontent.com/1700450/33243708-1b2e2538-d2e3-11e7-8d55-5f4d229f5802.png)


  This dashboard contains all of the information for your app, as well configuration options for listening to events, enabling your app to run as a user, and much more!

### Listen to events in Watson Work Services
Now that your app is registered with Watson Work Services, we can enable it with a variety of different capabilities.

For now we're going to focus on **Listen to Events** to set our app up to retrieve messages from Watson Work Services.

1. Click on the **Listen to Events** tab on the side menu in your Apps Dashboard.

  ![ListenToEvents](https://user-images.githubusercontent.com/1700450/33242252-ad127798-d2c9-11e7-9a13-a126bb112c00.png)

2. Click on **Add an outbound webhook**.

  ![AddWebhook](https://user-images.githubusercontent.com/1700450/33243752-f1de053a-d2e3-11e7-9fd4-b5894fda55af.png)

  * Provide any `Webhook Name` that you would like. This name won't be displayed anywhere.
  * For the `Webhook URL`, provide the following URL, based on the **app name** that was copied above from IBM Cloud.
    * **Webhook URL:** `<appname>.mybluemix.net/webhooks/<app-id>`.
      * Example: `watsonworkspacegif-20171126165435919-noninsistent-grandee.mybluemix.net/0f5596a4-34f5-46d0-8a0f-6b0d85169f04`.

      The form includes the `https://`, so no need to include that in the input box.  

  * For the **Events** section, check the `message-created` and `message-annotation-added` option.

3. Once you click **Save**, a confirmation dialog will appear with your `Webhook Secret`. **Copy this secret.** We will need it for configuring our IBM Cloud app.

    ![WebhookConfirmation](https://user-images.githubusercontent.com/1700450/33242462-54217a2c-d2cd-11e7-8cd8-69b23a456755.png)

    **Note:** Even though we have saved the webhook, the webhook is not enabled until we update our app to use the webhook secret. We will come back to the **Listen to Events** panel to enable it after updating these values in IBM Cloud.

4. Click on the **Add an Action** tab on the side menu in your Apps Dashboard.

    ![addAction](https://user-images.githubusercontent.com/1700450/33243399-82dab670-d2dd-11e7-8618-25f74fa48f3d.png)

5. Click on **Add an action**.

    ![addActionDescription](https://user-images.githubusercontent.com/1700450/33243429-fb7843ea-d2dd-11e7-8b1c-f9e31748b60f.png)

    * Provide any `Name` that you would like. This name won't be displayed anywhere.
    * For the `Description`, enter the description you would like to be displayed.
    * Click on the `Configure command` to continue.

    ![ConfigureActionCommand](https://user-images.githubusercontent.com/1700450/33243438-1e5e6920-d2de-11e7-9a1c-0bfc02d0009b.png)

    * For `Command`, enter a keyword which users will invoke.
    * Provide any `Hint` that you would like to be displayed to the user.
    * Click on the `Configure webhook` to continue.

    ![ConfigureActionWebhook](https://user-images.githubusercontent.com/1700450/33243443-2e9fd47c-d2de-11e7-88c5-2f66b3ab70c3.png)

    * We will use the previously created webhook for listening to `actionSeleted` events
    * From the drop down, select already created webhook. For example, `gif hook` or whatever you named it during creation.
    * Click on the `Summary` to continue.

    ![AddActionToWebhook](https://user-images.githubusercontent.com/1700450/33243444-3f41f9f4-d2de-11e7-9af1-c15837c5b9cd.png)

    * Verify the details you have entered so far.
    * Click on the `Add Your Action` to successfully add action to the app.

    ![ActionAddedSuccess](https://user-images.githubusercontent.com/1700450/33243445-49681e0e-d2de-11e7-8c37-199b311a1695.png)

    * A confirmation dialog will appear with your newly updated webhook details.

6. Navigate back to you IBM Cloud app dashboard to input the ids and secrets. In your IBM Cloud app dashboard, navigate to **Runtime** on the side menu, and then the **Environment variables** tab.

  ![IBMCloudAppVar](https://user-images.githubusercontent.com/1700450/33242485-cfe5598a-d2cd-11e7-86c5-6bb0268a0c22.png)

7. Add the following environment variables:
  * Name: `APP_ID`, Value: `Id copied from app registration success dialog`
  * Name: `APP_SECRET`, Value: `Secret copied from app registration success dialog`
  * Name: `WEBHOOK_SECRET`, Value: `Secret copied from webhook registration`

  ![EnvVariables](https://user-images.githubusercontent.com/1700450/33242478-a1c258f0-d2cd-11e7-923a-166e7b304cfb.png)

  Click **Save** and the app will automatically restart.

  ![restart](https://user-images.githubusercontent.com/1700450/33242498-01f4f7f0-d2ce-11e7-8c65-b273a62c78c9.png)
  ![running](https://user-images.githubusercontent.com/1700450/33242519-2270255e-d2ce-11e7-92b5-43cb27f31602.png)

8. Once the app has restarted. Navigate back to the **Listen to Events** page for your app in the Watson Work Services developer experience. Select the **Enable** button on your webhook.

  ![EnableWebhook](https://user-images.githubusercontent.com/1700450/33242525-3985c3d4-d2ce-11e7-9016-27768b2a6d60.png)

  The button should then turn to **Disable** if enablement of the webhook was a success.

  ![EnabledWebhook](https://user-images.githubusercontent.com/1700450/33242528-437c4a5c-d2ce-11e7-9314-98cc8a207143.png)

  Now your app is connected to Watson Work Services, and can both post messages and listen to `message-created` and `message-annotation-added` events! Let's try it out.

### Try out your app in Workspace

After the app is registered and configured to listen to events, we can try it out by adding it to a space in Workspace.

1. Open [Watson Workspace](https://workspace.ibm.com) in a new tab.

  ![Workspace](https://user-images.githubusercontent.com/1700450/33242572-132045f6-d2cf-11e7-9ab3-0726a06bd914.png)

2. Create a new space to add the app to. You can click on the `Create a Space` button or the `+` icon next to the **Spaces** title.

  ![WorkspaceNewSpace](https://user-images.githubusercontent.com/1700450/33243372-f60e743e-d2dc-11e7-9bc2-678a7b2d5a9b.png)

3. Click on the space name at the top to go to the Space Settings panel. From here you can click on the **Apps** link on the left to view apps to add.

  ![AppsPanel](https://user-images.githubusercontent.com/1700450/33243378-160797a2-d2dd-11e7-9ba6-335e62777acc.png)

4. Click on the app to add it to the space.

  ![AddApp](https://user-images.githubusercontent.com/1700450/33243380-22bfcb18-d2dd-11e7-83d7-36434609490e.png)

5. Now we can try to interact with the app. First let's send a message to see if the app can echo it back. The app is configured to listen for `@gif <keyword | giphy link>`. It also parses giphy link in the message, so pasting a giphy.com link would also trigger the app to fetch the gif and post it back in the space.

   Attempt to send in `@gif nice job`. The app should respond.

   ![AppResponse](https://user-images.githubusercontent.com/1700450/33243384-44ad6aaa-d2dd-11e7-96a5-983fee74ddef.png)

6. You can also interact the with the app via `/commands`. The app is registered to listen on `/gif keyword | giphy link`. 
    Attempt to trigger via `/gif awesome`

    ![AppResponseSlashCommand](https://user-images.githubusercontent.com/1700450/33235000-e7b4635e-d227-11e7-8555-f6647078c96f.gif)

Now we have an app that integrates with IBM Watson Workspace & Giphy.com.


## Running locally

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
15. Make a change to `index.js` and save. This causes the app to restart and load the updated `.env` file.
16. Back in you browser, select the `Enable` button to complete the process.
17. Follow the instructions in [Share App](https://workspace.ibm.com/developer/apps/dashboard/share) to add the app to a space.
18. Go write some code!
