import Script from "next/script";
import styles from "../styles/Home.module.css";

export default function Home() {
  function startEditing(publicId) {
    const myEditor = cloudinary.mediaEditor();
    myEditor.update({
      cloudName: "ifeomaimoh",
      publicIds: [publicId],
      image: {
        steps: ["resizeAndCrop", "imageOverlay", "textOverlays", "export"],
        resizeAndCrop: {
          toggleAspectRatio: true,
          aspectRatioLock: true,
          flip: true,
          rotate: true,
          presets: [
            "original",
            "square",
            "landscape-16:9",
            "landscape-4:3",
            "portrait-3:4",
            "portrait-9:16",
            { label: "Cover Ad", width: 500, height: 1000 },
          ],
        },
        imageOverlay: {
          overlays: [
            {
              publicId: "logo",
              label: "Logo",
              transformation: [],
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
          presets: ["heading", "subtitle", "body", "caption"],
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
          share: true,
        },
      },
    });
    myEditor.show();
    myEditor.on("export", function (data) {
      console.log(data);
      window.open(data.assets[0].downloadUrl, "_blank");
    });
  }

  const handleUpload = async (e) => {
    const clUrl = "https://api.cloudinary.com/v1_1/ifeomaimoh/image/upload";
    const uploadPreset = "testpreset";
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    const res = await fetch(clUrl, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    const publicId = data.public_id;
    console.log(publicId);
    startEditing(publicId);
  };

  return (
    <div className={styles.container}>
      <input type="file" onChange={handleUpload} />
      <Script
        src="https://media-editor.cloudinary.com/all.js"
        type="text/javascript"
      ></Script>
    </div>
  );
}