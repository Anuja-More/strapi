import styles from "../styles/Nav.module.scss";
import React, { useState } from "react";
import Parse from "html-react-parser";
import NextImage from "next/image";
import Link from "next/link";
import { Dropdown } from "primereact/dropdown";

const Header = ({ headerData }) => {
  console.log(headerData);
  const lang = [
    { name: "English", code: "en" },
    { name: "French", code: "fr" },
  ];
  const [selectedCity, setSelectedCity] = useState(lang[0]);

  return (
    <nav className={styles.header}>
      {headerData?.navData?.data?.attributes?.Logo && (
        <div className={styles.header__logo}>
          <NextImage
            priority
            src={
              headerData.navData.data.attributes.Logo.data.attributes.url
            }
            alt={"Logo"}
            height={
              headerData.navData.data.attributes.Logo.data.attributes.height
            }
            width={
              headerData.navData.data.attributes.Logo.data.attributes.width
            }
          />
        </div>
      )}
      <ul className={styles.header__menu}>
        {headerData?.navData?.data?.attributes?.Spiritualfound_menu?.data
          ?.attributes?.Spiritualfound_Menu.map((menuItem) => (
            <li key={menuItem.id} className={styles.header__menu_item}>
              <Link
                href={menuItem.Url}
                className={styles.header__menu_link}
                {...(menuItem.NewTab ? 'target="_blank"' : "")}
              >
                {Parse(menuItem?.Text)}
              </Link>
            </li>
          ))}
      </ul>
      <div className="card flex justify-content-center">
        <Dropdown
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.value);
            const locale = e.value.code;
            const currentPath = window.location.pathname;
            const pathParts = currentPath.split("/");
            if (pathParts.length > 1) {
              pathParts[1] = locale;
              const newPath = pathParts.join("/");
              window.location.pathname = newPath;
            }
          }}
          options={lang}
          optionLabel="name"
          placeholder="Select Language"
          className="w-full md:w-14rem"
        />
      </div>
    </nav>
  );
};

export default Header;
