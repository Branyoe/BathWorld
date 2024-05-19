import { useEffect } from "react";
import useAdmAppBarTitle from "../../../hooks/useAdmAppBarTitle";

const BathListView = () => {
  const [setTitle] = useAdmAppBarTitle();

  useEffect(() => {
    setTitle("Lista de baños");
  }, [setTitle])

  return (
    <h1>BathList</h1>
  );
}

export default BathListView;