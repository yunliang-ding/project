import Preview from '@/pages/preview';
import R from '@/pages/index';
import Errorboundary from '@/pages/error-boundary';
import R404 from '@/pages/404';
import R403 from '@/pages/403';
import Componentcodehistory from '@/pages/component/code-history';

export default [
  {
    "path": "/preview",
    "component": <Preview />
  },
  {
    "path": "/",
    "component": <R />
  },
  {
    "path": "/error-boundary",
    "component": <Errorboundary />
  },
  {
    "path": "/404",
    "component": <R404 />
  },
  {
    "path": "/403",
    "component": <R403 />
  },
  {
    "path": "/component/code-history",
    "component": <Componentcodehistory />
  }
]