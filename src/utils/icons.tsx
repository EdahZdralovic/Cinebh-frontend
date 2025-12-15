import { GoLock } from 'react-icons/go';
import { LuMail } from 'react-icons/lu';
import { SlLocationPin } from 'react-icons/sl';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BiCameraMovie } from 'react-icons/bi';
import { MdOutlineAccessTime } from 'react-icons/md';

export const LOCK_ICON = (
  <GoLock className="absolute left-1 top-1/2 -translate-y-1/2 w-10 pointer-events-none" />
);
export const MAIL_ICON = (
  <LuMail className="absolute left-1 top-1/2 -translate-y-1/2 w-10 pointer-events-none" />
);

export const LocationIcon = <SlLocationPin />;
export const VenueIcon = <HiOutlineOfficeBuilding />;
export const GenreIcon = <BiCameraMovie />;
export const ProjectionIcon = <MdOutlineAccessTime />;
