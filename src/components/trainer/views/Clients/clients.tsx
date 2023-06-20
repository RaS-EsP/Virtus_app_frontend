import React, { useState, useRef, useEffect, Children } from "react";
import { LoadingSpinner } from "../../../LoadingSpinner";
import { useGetClientsByTrainer } from "../../hooks/useGetClientsByTrainer";
import { Client } from "../../../../Interfaces";
import { DotsMenu } from "../../../../img/icons/3DotsMenu";
import { CloseNavButton } from "../../../header/NavButtons";
import { DataTableOfClients } from "./components/DataTableofClients";
import { ModalAddClient } from "./components/ModalAddClient";
import { Transition } from "@headlessui/react";
import { transitionOpacity } from "../../../../transitions/transitions";

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
      <Transition show={AddClientModal} {...transitionOpacity}>
        <ModalAddClient
          AddClientModal={AddClientModal}
          HandleAddClientModal={HandleAddClientModal}
        />
      </Transition>
      {/* MODAL */}
    </>
  );
};
