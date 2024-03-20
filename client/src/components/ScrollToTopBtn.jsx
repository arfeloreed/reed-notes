import React, { useState, useEffect } from "react";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ScrollToTopBtn() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) setShowBtn(true);
      else setShowBtn(false);
    });
  }, []);

  return (
    showBtn && (
      <div className="scrollBtnCon">
        <button
          type="button"
          className="text-bg-success"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      </div>
    )
  );
}

export default ScrollToTopBtn;
