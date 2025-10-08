// Type definitions for @vercel/analytics
// This prevents TypeScript from looking for tsconfig.json in node_modules

declare module '@vercel/analytics' {
  import { ComponentType } from 'react';
  
  interface AnalyticsProps {
    mode?: 'auto' | 'development' | 'production';
    debug?: boolean;
    beforeSend?: (event: any) => any;
  }
  
  const Analytics: ComponentType<AnalyticsProps>;
  
  export { Analytics };
  export default Analytics;
}
