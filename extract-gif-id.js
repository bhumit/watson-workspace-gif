const regex = /https?:\/\/(\?|media\.giphy\.com\/media\/([^ /\n]+)\/giphy\.gif|i\.giphy\.com\/([^ /\n]+)\.gif|giphy\.com\/gifs\/(?:.*-)?([^ /\n]+))/ig;
// const str = ` http://i.giphy.com/VmzI60RQG0fuw.gif
// https://media.giphy.com/media/VmzI60RQG0fuw/giphy.gif
// http://giphy.com/gifs/music-videos-mariah-carey-dreamlover-VmzI60RQG0fuw
// http://giphy.com/gifs/VmzI60RQG0fuw
// http://giphy.com/gifs/sbYP9PtdaRVsY/html5`;
let m;

const _ = require('lodash');


exports.getIds = (message) => {

    const gifIds = [];
    while ((m = regex.exec(message)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        const y = m.filter(Boolean);
        const gifId = _.findLast(y);
        gifIds.push(gifId);
    }
    return gifIds;

};

