/** @format */

import { useState, useContext } from "react";
import clip from "@/assets/clip.svg";
import doc from "@/assets/doc.svg";
import cloudUpload from "@/assets/cloud-upload.svg";
import upload from "@/assets/upload.svg";
import MyContext from "@/context/context";
import { ContextValue, UploadPropType } from "@/types";
import { useNotifier } from "@/hooks/useNotifier";
import Mutation from "@/api/mutation";
import { getCookie, setCookie } from "@/services/storage";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { Icons } from "@/constants/svgs";

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
          className={`px-3 py-10 mx-3 my-3 lg:w-full w-fit rounded-lg flex flex-col h-fit relative bg-white`}>
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
  ) : uploadType === "single" ? (
    <>
      <p className='text-sm font-normal m-3 text-left'>{tag}</p>
      <div className={`flex items-center flex-col pb-5 w-full`}>
        <section
          className={`px-3 py-1 mx-3 w-full rounded-lg flex flex-col h-fit relative bg-[#585BA80A]`}>
          <input
            type='file'
            onChange={handleFileChange}
            id={id}
            className='hidden'
          />
          <label htmlFor={id} className='cursor-pointer w-full'>
            <div className='flex justify-center w-full'>
              <div className='w-full text-center text-[#838384]'>
                {selectedFile ? (
                  <div>
                    {imageUrl !== null ? (
                      <div className='flex flex-col items-center py-2'>
                        <p>{imageUrl}</p>
                        <img src={doc} alt='image' />
                      </div>
                    ) : (
                      <p>No image selected</p>
                    )}
                  </div>
                ) : (
                  <>
                    <p className='text-sm my-2'>Upload pictures</p>
                    <div className='flex justify-center'>
                      <img src={cloudUpload} alt='' />
                    </div>
                  </>
                )}
              </div>
            </div>
          </label>
        </section>
      </div>
    </>
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

export const UploadSingle = ({ defaultPhoto, updatePhotoFunction }: any) => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleEditImageClick = () => {
    document.getElementById("file-input")?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if files exist and if the first file is available
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      console.log(file);
      setSelectedFile(file);

      reader.onload = () => {
        setImageUrl(file.name || null);
        updatePhotoFunction((prevData: any) => ({
          ...prevData,
          photo: reader.result as string,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const { showNotifier, NotifierComponent } = useNotifier();
  const { mutation } = Mutation();

  const handleFormSubmit = () => {
    if (!selectedFile || !userData) {
      showNotifier({
        title: "Error",
        text: "Please select a file and make sure user data is available.",
        status: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile); // Append the file to the FormData
    formData.append("id", userData.id); // Append the user ID

    const data = {
      method: "post",
      url: "user/updatephoto",
      content: formData, // Pass the formData as content
    };

    mutation.mutate(data, {
      onSuccess: (data) => {
        if (data.status) {
          showNotifier({
            title: "Success",
            text: `Image has been successfully updated!`,
            status: "success",
          });
          const updatedData = {
            ...userData,
            photo: `https://api.medlifelink.life/images/profiles/${data.data.photo}`,
          };
          setCookie("@user", JSON.stringify(updatedData), 1);
          navigate(0);
        } else {
          const errorMessage =
            data.message ||
            data.error ||
            data.errors?.join("\n") ||
            data.errors;
          showNotifier({
            title: "Error",
            text: errorMessage,
            status: "error",
          });
        }
      },
      onError: (error) => {
        console.error("Error submitting data:", error);
        showNotifier({
          title: "Error",
          text: "There was an error submitting your data. Please try again.",
          status: "error",
        });
      },
    });
  };

  return (
    <div className='flex'>
      <div className='w-[111.74px] h-[111.74px] relative rounded-full'>
        <button className='relative' onClick={handleEditImageClick}>
          <img
            src={defaultPhoto}
            alt='user'
            className='rounded-full relative'
          />
          <span className='h-[22.98px] w-[22.98px] rounded-full bg-[#FAC1D9] absolute bottom-0 right-2 flex items-center justify-center'>
            <Icons.pencil width='12.77' height='12.77' />
          </span>
        </button>
      </div>
      <input
        type='file'
        id='file-input'
        accept='image/*'
        className='hidden'
        onChange={handleImageChange}
      />
      {imageUrl && (
        <Button
          className='bg-[#585BA8] text-white py-2 px-4 rounded-lg mt-3'
          onClick={handleFormSubmit}>
          {mutation.isPending ? (
            <>
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              Saving
            </>
          ) : (
            "Save Image"
          )}
        </Button>
      )}
      {NotifierComponent}
    </div>
  );
};

export default Upload;
