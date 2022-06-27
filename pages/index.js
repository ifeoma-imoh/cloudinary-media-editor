import Script from "next/script";
import styles from "../styles/Home.module.css";
import startEditing from "../utils/startEditing";
import { cloudName, uploadPreset } from "../utils/cloudinaryConfig";

export default function Home() {
  const handleUpload = async (e) => {
    const clUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
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
      <input type="file" accept="image/*" onChange={handleUpload} />
      <Script
        src="https://media-editor.cloudinary.com/all.js"
        type="text/javascript"
      ></Script>
    </div>
  );
}
