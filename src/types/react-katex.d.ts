declare module 'react-katex' {
  import * as React from 'react';

  interface MathComponentProps {
    math?: string;
    children?: string;
    errorColor?: string;
    renderError?: (error: Error | TypeError) => React.ReactNode;
    settings?: any;
    as?: React.ElementType;
  }

  export const InlineMath: React.FC<MathComponentProps>;
  export const BlockMath: React.FC<MathComponentProps>;
}
