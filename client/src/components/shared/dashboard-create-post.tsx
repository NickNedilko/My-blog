import { Button, FileInput, Select, TextInput } from "flowbite-react"
import { IoIosClose } from "react-icons/io";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Title } from "./title";
import { useRef, useState } from "react";
import { useCloudinaryUpload } from "../../hooks/cloudinary-upload";


export const CreatePost = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { uploadImage, cloudinaryUrl } = useCloudinaryUpload();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    console.log(cloudinaryUrl);

   const handleImageChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageUrl(URL.createObjectURL(file));
          
        }
        await uploadImage(file as File);
        
    }

  return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen md:w-[600px] xl:w-[768px]">  
          <Title text="Create Post" size="lg" className="text-center mb-3" />
              {imageUrl ? (
                  <div className="relative flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 mb-3">
                  <img src={imageUrl} alt="preview" className="w-full h-1/2 object-cover" />
                  <IoIosClose onClick={() => setImageUrl(null)} className="absolute top-2 right-2 text-3xl text-red-500 cursor-pointer"/>
                   </div>
          ) : (
              <Button onClick={() => inputRef.current?.click()} type="button" outline size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500 mb-3">Upload image</Button>
              
            )}
            <FileInput ref={inputRef} accept="image/*" onChange={handleImageChange} className="hidden" />    
          <form className="flex flex-col gap-4 ">
              <div className="flex flex-col gap-4 sm:flex-row justify-between">
                  <TextInput
                      className="flex-1"
                      type="text"
                      placeholder="Title"
                      required />
                  <Select>
                        <option value="uncotegorized">Select category</option>
                        <option value="development">Development</option>
                        <option value="sport">Sport</option>
                      <option value="films">Films</option>
                        <option value="free">Free</option>
                  </Select>
                 
              </div>
                <TextInput
                      className="flex-1"
                      type="text"
                      placeholder="Tags"
                      required />
             
                <div className="border-2 border-gray-300 rounded-lg p-3">
                    <ReactQuill theme="snow" placeholder="Write your post here..."  className="h-72 mb-16 md:mb-12" />
                </div>
                <Button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500 mt-2">Publish</Button>
          </form>
    </div>
  )
}

