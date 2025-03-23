import { ReactNode } from 'react';
import { Loading, cloneChildren } from 'react-basics';
import ErrorMessage from '@/components/common/ErrorMessage';
import { formatLongNumber } from '@/lib/format';

export interface MetricsBarProps {
  isLoading?: boolean;
  isFetched?: boolean;
  error?: unknown;
  children?: ReactNode;
}

export function MetricsBar({ children, isLoading, isFetched, error }: MetricsBarProps) {
  const formatFunc = n => (n >= 0 ? formatLongNumber(n) : `-${formatLongNumber(Math.abs(n))}`);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,max-content))] gap-5 w-full relative sm:grid-cols-2">
      {isLoading && !isFetched && <Loading icon="dots" />}
      {error && <ErrorMessage />}
      {!isLoading &&
        !error &&
        isFetched &&
        cloneChildren(children, child => {
          //@ts-ignore
          return { format: child.props.format || formatFunc };
        })}
    </div>
  );
}

export default MetricsBar;
