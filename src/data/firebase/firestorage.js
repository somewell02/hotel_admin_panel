import { firebaseApp } from "./firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const storage = getStorage(firebaseApp);

export const addImageInStorage = async (image, name, path) => {
  var blob = image.slice(0, image.size, image.type);
  const modifiedImage = new File(
    [blob],
    name + "." + image.name.split(".")[1],
    {
      type: image.type,
    }
  );

  const storageRef = ref(storage, path + modifiedImage.name);

  await uploadBytes(storageRef, modifiedImage);
  let imageUrl = null;
  await getDownloadURL(storageRef).then((url) => {
    imageUrl = url;
  });

  return imageUrl;
};

export const deleteFolder = (path) => {
  const desertRef = ref(storage, path);

  deleteObject(desertRef).then(() => {
    return true;
  });
};
