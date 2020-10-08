export default (imageSrc) =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const w = image.width;
      const h = image.height;

      canvas.width = w;
      canvas.height = h;

      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      const pixel = imageData.data;

      const r = 0;
      const g = 1;
      const b = 2;
      const a = 3;

      const stack = [];
      stack.push(0);
      stack.push(w * 4 - 4);
      stack.push(h * w * 4 - 4);
      stack.push(h * w * 4 - w * 4);

      let col = 0,
        row = 0,
        gr = false,
        gl = false,
        gu = false,
        gd = false;

      while (stack.length > 0) {
        const ind = stack.pop();
        const threshold = 240;
        if (pixel[ind + a] === 255) {
          if (
            pixel[ind + r] >= threshold &&
            pixel[ind + g] >= threshold &&
            pixel[ind + b] >= threshold
          ) {
            pixel[ind + a] =
              (765 - pixel[ind + r] - pixel[ind + g] - pixel[ind + b]) / 3;

            col = ((ind / 4) % w) + 1;
            row = Math.floor(ind / 4 / w) + 1;
            gr = col < w && pixel[ind + 4 + a] === 255;
            gl = col > 1 && pixel[ind - 4 + a] === 255;
            gu = row > 1 && pixel[ind - w * 4 + a] === 255;
            gd = row < h && pixel[ind + w * 4 + a] === 255;

            if (gu && gl && pixel[ind - 4 - w * 4 + a] === 255) {
              stack.push(ind - 4 - w * 4);
            }
            if (gu) {
              stack.push(ind - w * 4);
            }
            if (gu && gr && pixel[ind + 4 - w * 4 + a] === 255) {
              stack.push(ind + 4 - w * 4);
            }
            if (gl) {
              stack.push(ind - 4);
            }
            if (gr) {
              stack.push(ind + 4);
            }
            if (gd && gl && pixel[ind + w * 4 - 4 + a] === 255) {
              stack.push(ind + w * 4 - 4);
            }
            if (gd) {
              stack.push(ind + w * 4);
            }
            if (gd && gr && pixel[ind + w * 4 + 4 + a] === 255) {
              stack.push(ind + w * 4 + 4);
            }
          } else {
            pixel[ind + a] = 150;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      });
    });

    image.addEventListener("error", () => reject);

    image.crossOrigin = "";
    image.src = imageSrc;
  });
