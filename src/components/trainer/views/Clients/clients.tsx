import React from "react";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../../../LoadingSpinner";
import { useGetClientsByTrainer } from "../../hooks/useGetClientsByTrainer";
import { URLS } from "../../../../urls";
import { Client } from "../../../../Interfaces";
import { DotsMenu } from "../../../../img/icons/3DotsMenu";
export const ClientsByTrainer = () => {
  const { clients, Isloading } = useGetClientsByTrainer();

  return (
    <div className=" flex justify-center flex-col min-h-fit p-10  ">
      {Isloading ? (
        <DataTableOfClients clients={clients} />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export const DataTableOfClients = ({ clients }: { clients: Client[] }) => {
  return (
    <>
      <div className="text-center text-xl font-bold mb-2">
        Clients: <span>{clients.length} </span>
      </div>
      <div className=" rounded-md shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Last Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Action</th>
          </thead>
          <tbody className="bg-white border-b">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900 ">jaiem</th>
              <td className="px-6 py-4">hola</td>
              <td className="px-6 py-4">hola</td>
              <td className="px-6 py-4">hola</td>
              <td className="px-6 py-4">
                <div className="">
                  <DotsMenu />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
