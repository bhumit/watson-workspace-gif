'use strict';

const logger = require('winston');

const giphy = require('giphy-api')();
const download = require('download-file');
const fs = require('fs-extra');
const rn = require('random-number');
const path = require('path');
const schedule = require('node-schedule');
const extractGiphyId = require('./extract-gif-id');

// creates a bot server with a single bot
const botFramework = require('watsonworkspace-bot');
const SDK = require('watsonworkspace-sdk');
const UI = SDK.UI;

botFramework.level('info');
botFramework.startServer();
const bot = botFramework.create(); // bot settings defined by process.env
bot.authenticate();

const ww = new SDK(
    process.env.APP_ID,
    process.env.APP_SECRET
);
ww.authenticate()
    .catch(error => logger.error(error));

function downloadGifAndPostInSpace(gifData, message) {
    const options = {
        directory: "./images/gifs/",
        filename: gifData.id + ".gif"
    };

    download(gifData.images.original.url, options, function (err) {
        if (err) throw err;
        const gifPath = path.resolve(options.directory + options.filename);
        ww.sendFile(message.spaceId, gifPath);

    });
}

function searchAndSendGif(searchString, message) {
    giphy.search({
        q: searchString,
        rating: 'g'
    })
        .then(function (result) {
            const randomIntOptions = {
                min: 1,
                max: result.count,
                integer: true
            };

            const number = rn(randomIntOptions);
            const gifData = result.data[number];
            downloadGifAndPostInSpace(gifData, message);
        }).catch(error => {
        console.log('caught', error.message);
    });
}

function sendGifByIds(ids, message) {
    giphy.id([ids], function (err, result) {
        if(err) throw err;
        result.data.forEach((gifData) => {
            downloadGifAndPostInSpace(gifData, message);

        });
    });
}

bot.on('message-created', (message) => {
    if (message.content.startsWith("@gif ")) {
        let searchString;
        searchString = message.content.trim().replace("@gif ", "");
        if(searchString.length !== 0) {
            searchAndSendGif(searchString, message);
        }
    }

    const ids = extractGiphyId.getIds(message.content);
    sendGifByIds(ids, message);
});

bot.on(`actionSelected:/gif`, (message, annotation, params) => {
    let dialog = UI.generic('Posting GIF in the space.', '');

    if(params.length === 0) {
        dialog = UI.generic('Please enter a keyword or paste Giphy URL', '');
        ww.sendTargetedMessage(message.userId, annotation, dialog);
        return;
    }

    let keyword = params.join(" ");

    const ids = extractGiphyId.getIds(keyword);
    if(ids.length > 0) {
        logger.log('info', ids);
        sendGifByIds(ids, message);
        dialog = UI.generic('Posting GIF in the space.', '');
        ww.sendTargetedMessage(message.userId, annotation, dialog);
        return;
    }

    logger.log('info',keyword);
    searchAndSendGif(keyword, message);
    dialog = UI.generic('Posting GIF in the space.', '');
    ww.sendTargetedMessage(message.userId, annotation, dialog);
});

schedule.scheduleJob('*/5 * * * *', function(){
    fs.emptyDir('./images/gifs')
        .then(() => {
            console.log('success!')
        })
        .catch(err => {
            console.error(err)
        })
});