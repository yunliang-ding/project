import R from '@/pages/index';
import Errorboundary from '@/pages/error-boundary';
import R404 from '@/pages/404';
import R403 from '@/pages/403';
import Preview from '@/pages/preview';
import Edit from '@/pages/edit';
import Dashboardschema from '@/pages/dashboard/schema';
import Dashboard from '@/pages/dashboard';

export default [
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
    "path": "/preview",
    "component": <Preview />
  },
  {
    "path": "/edit",
    "component": <Edit />
  },
  {
    "path": "/dashboard/schema",
    "component": <Dashboardschema />
  },
  {
    "path": "/dashboard",
    "component": <Dashboard />
  }
]