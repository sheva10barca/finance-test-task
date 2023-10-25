import React from 'react';

import INCODE_LOGO from '../../images/logos/incode.svg';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <a
        href="https://www.incode-group.com/"
        target="_blank"
        rel="noreferrer"
        className="header__link"
      >
        <img
          src={INCODE_LOGO}
          alt="Incode Group logo"
          className="header__logo"
        />
      </a>
      <h1 className="header__title">Finance Test Task</h1>
    </header>
  );
};
