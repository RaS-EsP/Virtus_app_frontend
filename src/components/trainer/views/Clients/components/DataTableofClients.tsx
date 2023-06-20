import { Client } from "../../../../../Interfaces";
import React, { useRef, useState, useEffect } from "react";
import { DotsMenu } from "../../../../../img/icons/3DotsMenu";
export const DataTableOfClients = ({
  clients,
  HandleAddClientModal,
}: {
  clients: Client[];
  HandleAddClientModal: any;
}) => {
  const [menuStates, setMenuStates] = useState(clients.map(() => false));
  const containerRef = useRef<any>(null);
  const handleMenuToggle = (index: number) => {
    const newMenuStates = menuStates.map((state, i) =>
      i === index ? !state : false
    );
    setMenuStates(newMenuStates);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setMenuStates(menuStates.map(() => false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="relative text-center text-xl font-semibold mb-2">
        Clients: <span>{clients.length} </span>
        <button
          onClick={HandleAddClientModal}
          className="absolute top-0 text-sm font-normal left-3 bg-FirstColor hover:bg-SecondColor text-white rounded-3xl py-1 px-2 cursor-pointer"
        >
          Add client
        </button>
      </div>
      <div className="rounded-md shadow-md overflow-x-auto" ref={containerRef}>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white border-b">
            {clients.map((client: Client, index: number) => (
              <tr key={client.id}>
                <td className="px-6 py-4 font-medium text-gray-900 hover:underline cursor-pointer ">
                  {client.name}
                </td>
                <td className="px-6 py-4">{client.last_name}</td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.username}</td>
                <td className="px-6 py-4">
                  <div className="">
                    <DotsMenu
                      isOpen={menuStates[index]}
                      onToggle={() => handleMenuToggle(index)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
