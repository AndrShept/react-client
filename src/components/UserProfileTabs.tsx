import { Link, Outlet, useLocation } from 'react-router-dom';

import { UploadPhotos } from './UploadPhotos';
import { buttonVariants } from './ui/button';

export const UserProfileTabs = () => {
  const { pathname } = useLocation();
  const linkName = pathname.split('/').at(-1);

  return (
    <section className=" mt-5 rounded-md h-full flex flex-col ">
      <div className="flex items-center  mx-auto md:flex-row flex-col gap-3">
        <UploadPhotos />
        <div>
          <Link
            className={buttonVariants({
              variant: linkName !== 'photos' ? 'outline' : 'default',
              size: 'lg',
              className: 'rounded-none ',
            })}
            to={'photos'}
          >
            Photo
          </Link>
          <Link
            className={buttonVariants({
              variant: linkName !== 'posts' ? 'outline' : 'default',
              size: 'lg',
              className: 'rounded-none ',
            })}
            to={'posts'}
          >
            Posts
          </Link>
        </div>
      </div>
      <div className="flex-1  mx-auto w-full md:p-8 p-4 ">
        <Outlet />
      </div>
    </section>
  );
};
