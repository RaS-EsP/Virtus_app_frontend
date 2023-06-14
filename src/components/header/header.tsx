import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Logo from "../../img//VIRTUS transparentazo blanco.png";
import {
  getAuthRole,
  getAuthToken,
  useIsAuthJwt,
} from "../trainer/hooks/useIsAuthJwt";
import { TokenAndTrainerNav } from "./token&trainer";
import { TokenAndClient } from "./token&client copy";
import { NotTokenNav } from "./NotToken";
import { BurgerButton, SettingsButton, SettingsMenu } from "./NavButtons";
import { CloseNavButton } from "./NavButtons";

export const Header = ({
  SetIsOpenNav,
  IsOpenNav,
}: {
  SetIsOpenNav: any;
  IsOpenNav: any;
}) => {
  const token = getAuthToken();
  const role = getAuthRole();

  const HandleNavState = () => {
    SetIsOpenNav(!IsOpenNav);
  };

  return (
    <section className="sticky flex flex-col md:flex-row md:p-1">
      <div id="logo" className="md:w-1/6 w-full flex justify-center py-1 h-12">
        <a className="flex justify-center w-20 " href="/">
          <img alt="Virtus Logo" src={Logo} className="hover:cursor-pointer " />
        </a>
        <div
          onClick={HandleNavState}
          className="absolute cursor-pointer left-2 top-4 md:hidden"
        >
          {IsOpenNav ? <CloseNavButton /> : <BurgerButton />}
        </div>
      </div>
      <div
        className={`w-full px-1 ${
          IsOpenNav ? "visible max-h-screen py-1" : "max-h-0 invisible"
        } transition-all ease-in-out duration-100 overflow-hidden bg-SecondColor md:bg-FirstColor gap-2 flex md:max-h-14 md:visible flex-col md:flex-row justify-around items-center text-center`}
      >
        {token ? (
          role == "trainer" ? (
            <TokenAndTrainerNav />
          ) : (
            <TokenAndClient />
          )
        ) : (
          <NotTokenNav />
        )}
      </div>
      <div className="w-1/12 absolute md:static right-2 top-4 md:flex md:justify-center md:items-center  ">
        <SettingsMenu />
      </div>
    </section>
  );
};
