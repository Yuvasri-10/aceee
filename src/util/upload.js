import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const uploadFile = async (file) => {
  const fileRef = ref(storage, `uploads/${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
};
