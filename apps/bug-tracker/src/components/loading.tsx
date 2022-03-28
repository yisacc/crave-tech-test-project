import { Skeleton } from 'antd';

export function TableLoading() {
  return (
      <>
        <div className="flex justify-between p-2">
          <Skeleton.Input active={true} size="default" style={{ width: 250 }} />
          <Skeleton.Button active={true} size="default" style={{ width: 100 }} />
        </div>

        <div className="flex flex-col p-2">
          <Skeleton.Input
            active={true}
            size="default"
            style={{ width: '100%' }}
          />
          <Skeleton.Input
            className="mt-3"
            active={true}
            size="default"
            style={{ width: '100%' }}
          />
          <Skeleton.Input
            className="mt-3"
            active={true}
            size="default"
            style={{ width: '100%' }}
          />
          <Skeleton.Input
            className="mt-3"
            active={true}
            size="default"
            style={{ width: '100%' }}
          />
        </div>
      </>
  );
}
