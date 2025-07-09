import React, { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "All", value: "" },
  { name: "Pending", value: "pending" },
  { name: "Interviewed", value: "interview" },
  { name: "Declined", value: "declined" },
];
const FilterDropdown = ({ onSearch }) => {
  const [selected, setSelected] = useState("");

  const handleSearch = async (e) => {
    const selectedStatus = e;
    setSelected(selectedStatus);
    onSearch(selectedStatus);
  };
  console.log("selected", selected);
  return (
    <div className="w-60">
      <Listbox value={selected} onChange={handleSearch}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white border border-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
            <span className="block truncate">
              {selected ? selected : "Filter By Status"}{" "}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
              {sortOptions.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
                    }`
                  }
                  value={option.value}
                  name="jobStatus"
                  onChange={(e) => handleSearch(e)}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected && (
                        <span className="absolute left-2 top-2.5 text-indigo-600">
                          <CheckIcon className="h-4 w-4" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default FilterDropdown;
