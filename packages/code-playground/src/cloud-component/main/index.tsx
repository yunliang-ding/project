import MainReact from './react';
import MainMd from './markdown';
import MainScript from './script';

export default (props: any) => {
  if (props.item.type === 2) {
    return <MainMd {...props} />;
  } else if (props.item.type === 3) {
    return <MainScript {...props} />;
  }
  return <MainReact {...props} />;
};

export const injectStyle = async (
  id: string,
  lessCode: string,
  less = window.less,
) => {
  const { css } = await less.render(lessCode);
  const styleTag = document.querySelector(`style[id=_${id}]`);
  if (styleTag) {
    styleTag.innerHTML = css;
  } else {
    const style = document.createElement('style');
    style.id = `_${id}`;
    style.innerHTML = css;
    document.querySelector('head')?.appendChild(style);
  }
};

export const injectScript = async (src: string, name) => {
  return new Promise((res) => {
    if (document.querySelector(`script[class=_${name}]`)) {
      res(true); // 存在直接返回
    } else {
      const script = document.createElement('script');
      script.src = src;
      script.className = `_${name}`;
      document.querySelector('head')?.appendChild(script);
      script.onload = () => {
        res(true);
      };
    }
  });
};

export const IconRender = ({ componentName }) => {
  if (componentName?.endsWith('.md')) {
    return <i className="file-icon markdown-lang-file-icon" />;
  } else if (componentName?.endsWith('.js')) {
    return <i className="file-icon javascript-lang-file-icon" />;
  } else if (componentName?.endsWith('.less')) {
    return <i className="file-icon less-lang-file-icon" />;
  }
  return <i className="file-icon javascriptreact-lang-file-icon" />;
};
