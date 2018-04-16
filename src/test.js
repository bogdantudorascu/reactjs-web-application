/* eslint-disable linebreak-style,arrow-body-style */
const getContext = () => document.getElementById('my-canvas').getContext('2d');

// It's better to use async image loading.
const loadImage = url => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`load ${url} fail`));
        img.src = url;
    });
};

// Here, I created a function to draw image.
const depict = options => {
    const ctx = getContext();
    // And this is the key to this solution
    // Always remember to make a copy of original object, then it just works :)
    const myOptions = Object.assign({}, options);
    return loadImage(myOptions.uri).then(img => {
        ctx.drawImage(img, myOptions.x, myOptions.y, myOptions.sw, myOptions.sh);
    });
};

const imgs = [
    { uri: 'http://placehold.it/50x50/f00/000?text=R', x: 15, y:  15, sw: 50, sh: 50 },
    { uri: 'http://placehold.it/50x50/ff0/000?text=Y', x: 15, y:  80, sw: 50, sh: 50 },
    { uri: 'http://placehold.it/50x50/0f0/000?text=G', x: 15, y: 145, sw: 50, sh: 50 }
];

imgs.forEach(depict);