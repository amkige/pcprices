export default (imageSrc) =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      const pix = imageData.data;
      const newColor = {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
      };

      for (let i = 0, n = pix.length; i < n; i += 4) {
        const r = pix[i];
        const g = pix[i + 1];
        const b = pix[i + 2];

        let max = 200;

        if (r >= max && g >= max && b >= max) {
          pix[i] = newColor.r;
          pix[i + 1] = newColor.g;
          pix[i + 2] = newColor.b;
          pix[i + 3] = newColor.a;
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
