import React from "react";

const Order = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-x-4 shadow-xl overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6">
        <a className="group relative block h-48 w-32 overflow-hidden bg-gray-100 sm:h-56 sm:w-40">
          <img
            src="https://images.unsplash.com/photo-1612681621979-fffe5920dbe8?auto=format&q=75&fit=crop&w=200"
            loading="lazy"
            alt="Photo by Thái An"
            className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
          />
        </a>

        <div className="flex flex-1 flex-col justify-between py-4">
          <div>
            <a
              href="#"
              className="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
            >
              Top
            </a>

            <span className="block text-gray-500">Size: S</span>
            <span className="block text-gray-500">Color: White</span>
          </div>

          <div>
            <span className="mb-1 block font-bold text-gray-800 md:text-lg">
              $15.00
            </span>

            <span className="flex items-center gap-1 text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex w-full justify-between border-t p-4 sm:w-auto sm:border-none sm:pl-0 lg:p-6 lg:pl-0">
          <div className="flex flex-col items-start gap-2">
            <div className="flex h-12 w-10 overflow-hidden rounded border">
              <span
                type="number"
                value="1"
                className="w-full px-4 py-2 outline-none ring-inset ring-indigo-300 transition duration-100 focus:ring"
              >
                1
              </span>
            </div>
          </div>

          <div className="ml-4 pt-3 md:ml-8 md:pt-2 lg:ml-16">
            <span className="block font-bold text-gray-800 md:text-lg">
              $15.00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
