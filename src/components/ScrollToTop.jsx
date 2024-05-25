import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BiSolidToTop } from "react-icons/bi";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  
  return (
    <BiSolidToTop
      size={"3rem"}
      alt="scrollup"
      className="fixed bottom-2 right-5 cursor-pointer"
      onClick={() => window.scrollTo(0, 0)}
    />
  
  )
    
}
