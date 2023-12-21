/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { uploadImage } from "../api";
interface IProps {
  setIsOpen: any;
}
function Upload(props: IProps) {
  const [images, setImages] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);
  const maxNumber = 1;
  const onChange = (imageList: any) => {
    // data for submit
    setImages(imageList);
  };

  const onUploadImage = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await uploadImage(images[0]?.file);
    setData(res.data);
    setImages([]);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => props.setIsOpen(false)}
          >
            &times;
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Upload images</h2>
        <div className="max-w-2xl mx-auto p-6 bg-gray-100">
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={["jpg", "png"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              dragProps,
            }) => (
              // write your building UI
              <div className="flex flex-wrap">
                {!images.length && (
                  <button
                    onClick={onImageUpload}
                    {...dragProps}
                    className="focus:outline-none border-2 border-purple-600 font-medium rounded-lg text-sm px-5 text-purple-700 py-2.5 mb-2 capitalize"
                  >
                    Add an image
                  </button>
                )}
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.data_url} alt="" width="300" />
                    <div className="mt-2">
                      <button
                        className="focus:outline-none border-2 border-purple-600 font-medium rounded-lg text-sm px-5 text-purple-700 py-2.5 mb-2 capitalize mr-2"
                        onClick={() => onImageUpdate(index)}
                      >
                        Change
                      </button>
                      <button
                        className="focus:outline-none border-2 border-purple-600 font-medium rounded-lg text-sm px-5 text-purple-700 py-2.5 mb-2 capitalize"
                        onClick={() => onImageRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                    <button
                      onClick={onUploadImage}
                      className="focus:outline-none border-2 border-purple-600 font-medium rounded-lg text-sm px-5 text-purple-700 py-2.5 mb-2 capitalize"
                    >
                      Upload
                    </button>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
          <div>{data && <span>keywords: {data.keywords}</span>}</div>
        </div>
      </div>
    </div>
  );
}
export default Upload;
