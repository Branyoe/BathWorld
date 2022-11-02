import { useEffect } from "react";
import appNavBarStore from "../../stores/appNavBarStore";

export const ContactView = () => {
  const {setShow, setValue} = appNavBarStore(state => ({
    setShow: state.setShow,
    setValue: state.setCurrent
  }));
  
  useEffect(() => {
    setShow(true);
    setValue("contact");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <h1>Conatc us</h1>
}