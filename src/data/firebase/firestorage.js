import { firebaseApp } from "./firebase";
import {
  getStorage,
  ref as stRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export const addImageInStorage = async (image, name, path) => {
  var blob = image.slice(0, image.size, image.type);
  const modifiedImage = new File(
    [blob],
    name + "." + image.name.split(".")[1],
    {
      type: image.type,
    }
  );

  const storage = getStorage(firebaseApp);
  const storageRef = stRef(storage, path + modifiedImage.name);

  await uploadBytes(storageRef, modifiedImage);
  let imageUrl = null;
  await getDownloadURL(storageRef).then((url) => {
    imageUrl = url;
  });

  return imageUrl;
};
