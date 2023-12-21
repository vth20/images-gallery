import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import { handleGetImageByKeyword, getKeywords } from "../api";
import { IoSearchOutline } from "react-icons/io5";
import { Image } from "./Image";
import Upload from "./Upload";
const ImageFilter = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [keyword, setKeyword] = useState<string>("");
  const [tags, setTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  //   const buttonCaptions = ["all", "cat", "dog", "bear"];
  const [images, setImages] = useState([]);
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    handleGetImageByTag(filter);
  };

  useEffect(() => {
    handleGetTags();
    handleGetImageByTag("all");
  }, []);

  const handleGetTags = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await getKeywords();
    setTags(res.data);
  }, []);

  const handleGetImageByTag = async (keyword: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await handleGetImageByKeyword(keyword);

    setImages(response.data);
  };

  const handleGetImageBySearch = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await handleGetImageByKeyword(keyword);
    setImages(response.data);
  };
  return (
    <section className="w-full flex flex-col gap-12 py-16 lg:px-16 md:px-10 px-5">
      <div className="flex w-full md:justify-center items-start md:gap-6 gap-3 flex-wrap">
        {["all", ...tags].map((filter) => (
          <Button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            type="button"
            className={`focus:outline-none border-2 border-purple-600 hover:bg-purple-700 font-medium rounded-lg text-sm px-5 text-white py-2.5 mb-2 capitalize ${
              activeFilter === filter ? "bg-purple-600" : " "
            }`}
          >
            {filter === "all" ? "Show all" : filter}
          </Button>
        ))}
        <div className="flex relative">
          <input
            id="inputTxt"
            className="focus:outline-none border-2 border-purple-600 font-medium rounded-lg text-sm px-5 text-black py-2.5 mb-2 capitalize"
            type="text"
            placeholder="Search ..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <IoSearchOutline
            className="absolute w-6 h-6 top-2 right-1 cursor-pointer"
            onClick={handleGetImageBySearch}
          />
        </div>
        {/* filtered cards display */}
        <main className="w-full grid lg:grid-cols-4 md:grid-cols-2 gap-x-5 gap-y-8 md:mt-8">
          {images.length &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            images.map((item: any, index) => (
              <div
                key={index}
                className={`w-full cursor-pointer transition-all duration-200 rounded-lg shadow bg-gray-800 border border-gray-600`}
              >
                <Image
                  className="rounded-t-lg w-full h-[200px] overflow-hidden"
                  image={item?.image_url}
                  alt={item?.public_id}
                  objectCover="object-cover"
                />
              </div>
            ))}
        </main>
        <div
          className="bg-white w-28 h-8 text-center leading-8 cursor-pointer fixed bottom-5 right-5"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add image
        </div>
        {isOpen && <Upload setIsOpen={setIsOpen} />}
      </div>
    </section>
  );
};

export default ImageFilter;
