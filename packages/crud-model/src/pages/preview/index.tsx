import { getUrlSearchParams } from '@yl-d/shared';
import { CrudModelRender } from '@yl-d/low-code';
import axios from 'axios';
import { Button } from '@yl-d/design';
import { IconArrowLeft } from '@yl-d/icon';
import { useNavigate } from 'react-router-dom';
import './index.less';

export default () => {
  const navigate = useNavigate();
  const { schema, type }: any = getUrlSearchParams(location.hash);
  return (
    <div className="designer-preview-wapper">
      <div className="designer-preview-wapper-header">
        <Button
          icon={<IconArrowLeft />}
          onClick={() => {
            navigate('/');
          }}
        >
          返回
        </Button>
      </div>
      <div className="designer-preview-wapper-sider">
        <div className="designer-preview-wapper-sider-left" />
        <div className="designer-preview-wapper-sider-right">
          <CrudModelRender
            schema={schema}
            type={type}
            require={{
              request: axios.create({
                baseURL: 'https://api-online.yunliang.cloud',
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};
