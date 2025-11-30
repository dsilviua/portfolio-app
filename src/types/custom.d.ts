declare module '*.svg' {
  import type React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '@/version.json' {
  interface VersionInfo {
    version: string;
    buildTime: string;
    buildTimestamp: number;
  }
  const versionInfo: VersionInfo;
  export default versionInfo;
}
