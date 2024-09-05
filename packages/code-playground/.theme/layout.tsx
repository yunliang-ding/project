import React, { useEffect } from "react";
import { Outlet } from 'react-router-dom';

export default () => {
  (window as any).monacoTheme = 'vs-dark';
  useEffect(() => {
    document.body.setAttribute('yld-theme', 'dark');
  }, []);
  return (
    <div className="playground show-file-icons">
      <div className="playground-body">
        <Outlet />
      </div>
    </div>
  );
};
