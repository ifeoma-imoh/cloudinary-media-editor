import { cloudName } from "./cloudinaryConfig";
function startEditing(publicId) {
  const myEditor = cloudinary.mediaEditor();
  myEditor.update({
    cloudName: cloudName,
    publicIds: [publicId],
    image: {
      steps: ["resizeAndCrop", "imageOverlay", "textOverlays", "export"],
      resizeAndCrop: {
        flip: true,
        rotate: true,
        presets: [
          "original",
          "square",
          "landscape-16:9",
          "landscape-4:3",
          "portrait-3:4",
          "portrait-9:16",
          "facebookAd",
          "facebookCover",
          "instagramStory",
          "twitterAd",
          "linkedInAd",
          "linkedInCover",
          { label: "Cover Ad", width: 500, height: 1000 },
        ],
      },
      imageOverlay: {
        overlays: [
          {
            publicId: "logo",
            label: "Logo",
            placementOptions: [
              "right",
              "left",
              "top",
              "bottom",
              "top_left",
              "top_right",
              "bottom_left",
              "bottom_right",
              "middle",
            ],
          },
        ],
      },
      textOverlays: {
        presets: [
          "heading",
          "subtitle",
          "body",
          "caption",
          {
            label: "My Header",
            size: 100,
            font: "Helvetica",
            previewText: "ABC",
            weight: "bold",
            style: "italic",
            color: "#ffffff",
          },
        ],
        initialColors: [
          "#3448c5",
          "#ff5050",
          "#f7bc00",
          " #48c4d8",
          "#0052cc",
          "#a600cc",
          "#8ecc00",
        ],
        showColorPicker: true,
      },
      export: {
        formats: ["auto", "png", "webp"],
        quality: ["auto", "best", "good", 55, 75, "low"],
        download: true,
      },
    },
  });
  myEditor.show();
}
export default startEditing;
