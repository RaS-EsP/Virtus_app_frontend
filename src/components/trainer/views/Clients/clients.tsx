import React, { useState } from "react";
import { LoadingSpinner } from "../../../LoadingSpinner";
import { useGetClientsByTrainer } from "../../hooks/useGetClientsByTrainer";

import { DataTableOfClients } from "./components/DataTableofClients";
import { ModalAddClient } from "./components/ModalAddClient";
import { Transition } from "@headlessui/react";
import { transitionClases } from "../../../../transitions/transitions";
export const ClientsByTrainer = () => {
  const { clients, Isloading } = useGetClientsByTrainer();
  const [AddClientModal, SetAddClientModal] = useState(false);

  const HandleAddClientModal = () => {
    SetAddClientModal(!AddClientModal);
  };

  return (
    <>
      <div className=" flex justify-center item flex-col min-h-fit p-10  ">
        {Isloading ? (
          <>
            <DataTableOfClients
              clients={clients}
              HandleAddClientModal={HandleAddClientModal}
            />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
      {/* MODAL */}
      <div>
        <Transition show={AddClientModal} {...transitionClases.opacity2}>
          <ModalAddClient
            AddClientModal={AddClientModal}
            HandleAddClientModal={HandleAddClientModal}
          />
        </Transition>
      </div>
      {/* MODAL */}
    </>
  );
};
