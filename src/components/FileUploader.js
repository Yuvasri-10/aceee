import React, { useState } from 'react';
import { db } from '../util/firebase';
import { collection, addDoc } from 'firebase/firestore';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file.");
      return;
    }

    setUploading(true);
    setStatus("Uploading...");

    try {
      // Simulate "upload" by saving info to Firestore
      const docRef = await addDoc(collection(db, "uploads"), {
        name: file.name,
        size: file.size,
        type: file.type,
        timestamp: new Date()
      });

      console.log("Document written with ID: ", docRef.id);
      setStatus("Upload finished ✅");
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("Upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*,.pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload to Firestore'}
      </button>
      <p>{status}</p>
    </div>
  );
};

export default FileUploader;
