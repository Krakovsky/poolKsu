import React from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { ru } from 'suneditor/src/lang';

const AdminAbout = () => {
  return (
    <div className="AdminAbout">
      <div className="Title Admin__title">Про басейн</div>
      <div className="AdminAbout__container">
        <SunEditor setOptions={{ buttonList: buttonList.complex, lang: ru }} setContents="text tes" />
      </div>
    </div>
  );
};

export default AdminAbout;
