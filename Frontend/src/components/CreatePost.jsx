import React, { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';

const CreatePost = ({ handleVisibility }) => {
    const inputFileRef = useRef(null);
    const caption = useRef(null);
    const [fileData, setFileData]= useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const apiUrl= import.meta.env.VITE_API_URL;


    const handleFileInput = () => {
        inputFileRef.current.click();
    }


    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        setFileData(e.target.files[0]);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    const handleShare = async () => {
        if (!fileData || !caption.current.value.trim()) {
            return alert("All fields are mandatory!");
        }
    
        const formData = new FormData();
        formData.append("files", fileData);
        formData.append("caption", caption.current.value);
    
        try {
            const res = await axios.post(`${apiUrl}/application/api/create-post`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
    
            if (res.data.ok) {  // Or use `ok` if your backend sends that
                alert("Post created Successfully!");
                setImagePreview(null);
                setFileData(null);
                caption.current.value = '';
                handleVisibility();
            } else {
                alert("Something went wrong! Please try again.");
            }
        } catch (error) {
            console.error("Error while creating post:", error);
            alert("Server error. Try again later.");
        }
    };
    

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50' >
            <div className="absolute inset-0 backdrop-blur-sm flex justify-end p-6 "  >
                <Plus className='cursor-pointer rotate-45 text-black dark:text-white' onClick={() => handleVisibility()} />
            </div>
            {
                !imagePreview &&
                <div className="relative z-10 bg-white dark:bg-gray-900 rounded-xl shadow-xl  w-[90%] max-w-md ">
                    <div className=" font-roboto  mb-4 text-black dark:text-white border-b text-center py-3 dark:border-gray-700 border-gray-200">Create New Post</div>
                    <div className='flex justify-center items-center flex-col pb-5'>

                        <div>
                            <input type="file" className='hidden' accept="image/*" ref={inputFileRef} onChange={handleFileUpload} />
                        </div>
                        <h1 className='my-5 text-2xl font-roboto text-black dark:text-white'>
                            Add photos and videos here
                        </h1>
                        <div>
                            <button onClick={handleFileInput} className='px-2 py-1 hover:bg-blue-600 cursor-pointer font-roboto hover:scale-105 transition-all duration-200 rounded-sm text-white bg-blue-500'>Select from device</button>
                        </div>
                        {imagePreview && (
                            <div className='mt-5'>

                                <img
                                    src={imagePreview}
                                    alt="Preview"

                                    className=" size-20 rounded shadow-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>
            }
            {
                imagePreview && (
                    <div className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[90%] max-w-md p-6 space-y-4">

                        {/* Preview + Caption */}
                        <div className="flex items-start gap-4">
                            {/* Image Thumbnail */}
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-24 h-24 object-cover rounded-lg shadow-md"
                            />

                            {/* Caption Input */}
                            <div className="flex-1">
                                <label className="block mb-1 text-sm font-medium p-0 text-gray-800 dark:text-gray-300">
                                    Caption
                                </label>
                                <textarea
                                    ref={caption}
                                    className="w-full h-24 resize-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    placeholder="Write your thoughts..."
                                />
                            </div>
                        </div>

                        {/* Share Button */}
                        <div className="flex justify-end">
                            <button onClick={handleShare} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-semibold transition-all duration-200">
                                Share
                            </button>
                        </div>
                    </div>
                )

            }

        </div>
    );
};

export default CreatePost;