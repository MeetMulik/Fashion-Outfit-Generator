import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../utils/firebase-config";
import { useStateValue } from "../context/StateProvider";

const MyOutfits = () => {
  const [outfits, setOutfits] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(
    () =>
      onSnapshot(query(collection(firestore, "images")), (snapshot) =>
        setOutfits(snapshot.docs.map((doc) => doc.data()))
      ),
    []
  );

  const myOutfits = outfits?.filter((outfit) => outfit.id === user.uid);

  const openInNewTab = (url) => {
    window.open(
      `https://lens.google.com/uploadbyurl?url=${url}`,
      "_blank",
      "noreferrer"
    );
  };

  return (
    <div classNameName="">
      <div>
        <div className="bg-gray-200 py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 md:mb-12 lg:text-3xl">
              Your Outfits
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {myOutfits[0]?.images.map((image) => (
                <div key={image}>
                  <div>
                    <div className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
                      <img
                        src={image}
                        alt="Pic"
                        className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                      />
                      <div class="relative flex w-full flex-col rounded-lg bg-white p-4 text-center">
                        <span
                          onClick={() => {
                            openInNewTab(image);
                          }}
                          className="text-lg font-bold text-gray-800 lg:text-xl cursor-pointer"
                        >
                          Shop Similar
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOutfits;
