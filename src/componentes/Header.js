import styles from "../styles/Nav.module.scss";
import Parse from "html-react-parser";
import NextImage from "next/image";
import Link from "next/link";
const Header = ({ headerData }) => {  

  return (
    <nav className={styles.header}>
    <div className={styles.header__logo}>
    <NextImage
      priority
      src={headerData.data.attributes.Logo.data.attributes.url}
      alt={"Logo"}
      className="img-fluid"
      height={headerData.data.attributes.Logo.data.attributes.height}
      width={headerData.data.attributes.Logo.data.attributes.width}
    />
    </div>
    <ul className={styles.header__menu}>
      {headerData.data.attributes.Smsfin_menu.data.attributes.Smsfin_Menu.map(menuItem => (
        <li key={menuItem.id} className={styles.header__menu_item}>
          <Link href={menuItem.Url} className={styles.header__menu_link} {...menuItem.NewTab ? 'target="_blank"' : ''}> {Parse(menuItem?.Text)}</Link>
        </li>
      ))}
    </ul>
  </nav>
  
  );
}

export default Header;
