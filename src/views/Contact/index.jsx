import { useContext } from "react";
import { useEffect, useRef } from "react";
import { Loading } from "../../components";
import { authContext } from "../../context/authContext";
import appNavBarStore from "../../stores/appNavBarStore";

export const ContactView = () => {
  const {user} = useContext(authContext);
  const { setShow, setValue } = appNavBarStore(state => ({
    setShow: state.setShow,
    setValue: state.setCurrent
  }));

  const ref = useRef(null);
  useEffect(() => {
    setShow(true);
    setValue("contact");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  if(!user) return <Loading />;

  window.ChatraSetup = {
    clientId: user.uid,
    mode: 'frame',
    /* id del bloque donde quieres integrar el chat */
    injectTo: 'chatra-wrapper'
  }

  



  return (
    <>
      {
        (function (d, w, c) {
          w.ChatraID = '66A5pXm8eXYhhHr9P';
          var s = d.createElement('script');
          w[c] = w[c] || function () {
            (w[c].q = w[c].q || []).push(arguments);
          };
          s.async = true;
          s.src = 'https://call.chatra.io/chatra.js';
          if (d.head) d.head.appendChild(s);
        })(document, window, 'Chatra')
      }
      <div id="chatra-wrapper" ref={ref.current} style={{ width: "100%", height: "90vh" }}></div>
    </>
  );
}