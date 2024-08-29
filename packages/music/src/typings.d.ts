interface LayoutProps {
  title: string;
  status: 'login' | 'loading' | 'error';
  dark?: boolean;
  collapsed?: boolean;
  primaryColor?: string;
  layout: 'horizontal' | 'vertical' | 'inline';
}