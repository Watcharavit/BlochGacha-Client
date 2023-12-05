// components/ImageUpload.tsx
import React, { useState, ChangeEvent } from "react";

interface ImageUploadProps {
	handleUpload: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ handleUpload }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setSelectedFile(file || null);
		setImageUrl(file ? URL.createObjectURL(file) : null);
	};

	// const handleUpload = async () => {
	//     if (!selectedFile) {
	//         console.error('No file selected');
	//         return;
	//     }

	//     const formData = new FormData();
	//     formData.append('image', selectedFile);

	//     try {
	//         const response = await fetch('/api/upload', {
	//             method: 'POST',
	//             body: formData,
	//         });

	//         if (response.ok) {
	//             console.log('File uploaded successfully');
	//             // Handle success, e.g., show a success message to the user

	//         } else {
	//             console.error('Failed to upload file');
	//             // Handle failure, e.g., show an error message to the user
	//         }
	//     } catch (error) {
	//         console.error('Error uploading file:', error);
	//     }
	// };

	return (
		<div>
			<input type="file" onChange={handleFileChange} />
			<button onClick={handleUpload}>Upload</button>
			{imageUrl && <img src={imageUrl} height={400} width={600} alt="Uploaded Image" />}
		</div>
	);
};

export default ImageUpload;
