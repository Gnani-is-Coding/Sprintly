import { useEffect, useState } from "react";

export const Breakpoints = {
  smMb: "SMALL_MOBILE",
  mb: "MOBILE",
  tb: "TABLET",
  lg: "DESKTOP",
};

function useResponsive() {
  const [currentBreakpoint, setBreakpoint] = useState({
    currentWidth: 320,
    currentDevice: Breakpoints.smMb,
  });

  const getCurrentBreakpoint = (width: number) => {
    switch (true) {
      case width <= 375:
        return Breakpoints.smMb;
      case width > 375 && width <= 768:
        return Breakpoints.mb;
      case width > 768 && width <= 1024:
        return Breakpoints.tb;
      default:
        return Breakpoints.lg;
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const clientWidth = window.innerWidth;
      const clientBreakpoint = getCurrentBreakpoint(clientWidth);
      setBreakpoint({
        currentWidth: clientWidth,
        currentDevice: clientBreakpoint,
      });
    };

    handleScroll(); // For initial renderring...

    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  return {
    currentWidth: currentBreakpoint.currentWidth,
    currentDevice: currentBreakpoint.currentDevice,
  };
}

export default useResponsive;
