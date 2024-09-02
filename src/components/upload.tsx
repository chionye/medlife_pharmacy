/** @format */

import { useState, useContext } from "react";
import clip from "@/assets/clip.svg";
import doc from "@/assets/doc.svg";
import upload from "@/assets/upload.svg";
import MyContext from "@/context/context";
import { ContextValue, UploadPropType } from "@/types";

const Upload: React.FC<UploadPropType> = ({
  uploadType = "default",
  icon,
  tag = "Upload Request",
  id = "fileInput",
}) => {
  const { userData, updateData } = useContext<ContextValue>(MyContext);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    let fileArr = [];
    if (file) {
      if (userData?.file) {
        fileArr = userData?.file;
      }
      fileArr.push({ id, file });
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setImageUrl(file?.name);
        if (uploadType == "default") {
          updateData({ picture: dataURL });
        }
      };
      updateData({ file: fileArr });
      reader.readAsDataURL(file);

      console.log(userData);
    } else {
      setSelectedFile(null);
      setImageUrl(null);
    }
  };

  return uploadType === "default" ? (
    <div className={`flex items-center flex-col mt-4 pb-5`}>
      <div className={`w-full mx-6 relative text-center`}>
        <p className='text-sm font-normal m-3'>Update Your Profile Pic</p>
        <section
          className={`px-3 py-10 mx-3 my-3 md:w-full w-fit rounded-lg flex flex-col h-fit relative bg-white`}>
          <input
            type='file'
            onChange={handleFileChange}
            id={id}
            className='hidden'
          />
          <label htmlFor={id} className='cursor-pointer'>
            <div className='flex justify-center'>
              <div className='w-3/4 text-center text-[#838384]'>
                <div className='flex justify-center'>
                  <img src={upload} alt='' />
                </div>
                {selectedFile ? (
                  <div>
                    <p>Selected File: {selectedFile.name}</p>
                    {imageUrl !== null ? (
                      <>
                        <img src={doc} alt='image' />
                        <p>{imageUrl}</p>
                      </>
                    ) : (
                      <p>No image selected</p>
                    )}
                  </div>
                ) : (
                  <>
                    <p className='text-sm my-2'>Upload pictures</p>
                    <p className='text-sm'>
                      Videos must be less than 30mb Pictures must be less than
                      2mb in size
                    </p>
                  </>
                )}
              </div>
            </div>
          </label>
          <div className='relative top-14 w-full flex justify-center'>
            <label
              className='bg-[#008080] rounded-2xl w-24 py-1 text-center text-white cursor-pointer'
              htmlFor={id}>
              Upload
            </label>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div
      className={`flex justify-center border-[#D9D9D9] border-2 bg-[#F8F9F9] border-dashed py-4 cursor-pointer`}>
      <input
        type='file'
        onChange={handleFileChange}
        id={id}
        className='hidden'
      />
      <label
        htmlFor={id}
        className='cursor-pointer w-full flex flex-row justify-center items-center gap-3 text-sm font-normal'>
        {imageUrl ? (
          <>
            <img src={doc} alt='image' />
            <p>{imageUrl}</p>
          </>
        ) : (
          <>
            <img src={icon ? icon : clip} alt='upload' />
            <p>{tag}</p>
          </>
        )}
      </label>
    </div>
  );
};

export default Upload;