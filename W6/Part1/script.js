let videoElement= document.getElementById("video");
let model;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.translate(500, 0);
ctx.scale(-1, 1);

const accessCamera = () => {
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: false,
        })
        .then((stream) => {
            videoElement.srcObject = stream;
            videoElement.play();

            options = {
                multiplier: 0.75,
                stride: 32,
                quantBytes: 4
            }
            bodyPix.load(options)
                .then(net => perform(net))
                .catch(err => console.log(err))
        });
};


async function perform(net) {

    while(true){
        const segmentation = await net.segmentPerson(video);

        const backgroundBlurAmount = 6;
        const edgeBlurAmount = 2;
        const flipHorizontal = true;
    
        bodyPix.drawBokehEffect(
            canvas, videoElement, segmentation, backgroundBlurAmount,
            edgeBlurAmount, flipHorizontal);
    }

}




accessCamera();