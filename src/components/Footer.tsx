import { Link } from "react-router-dom";

export default function Footer() {
  return (<footer
    className="mt-auto  h-[212px] pt-14 flex flex-col gap-4 left-0 w-full bg-[linear-gradient(to_right,rgba(26,26,26,1),rgba(178,34,34,1))] ">
    <div className=" text-white items-center justify-center text-center">
      <Link to="/">
        <div className="flex items-center justify-center">
          <img src="/assets/logos/Logo-white.png"
               alt="CineBH Logo"
               className="h-[32px] w-[130px] object-contain" />
        </div>
      </Link>
      <div className="flex items-center justify-center gap-6 pt-4 text-xs  text-white">
        <Link to="/about" className="hover:underline font-bold">
          ABOUT US
        </Link>
        <div className="w-[1px] h-[16px] bg-white opacity-100 rotate-0"></div>
        <Link to="/tickets" className="hover:underline font-bold">
          TICKETS
        </Link>
      </div>
      <div className="pt-4 ">
        <p className="text-sm font-normal">
          Copyright @Cinebh. Built with love in Sarajevo. All rights reserved.
        </p>
      </div>
    </div>
  </footer>);
}
