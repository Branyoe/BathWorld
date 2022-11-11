
import { Stack } from "@mui/material";
import BathCard from "./BathCard";

const BathList = ({baths}) => {
  return (
    <Stack m={1} >
      {baths?.map(bath => (
        <BathCard key={bath.id} bath={bath}/>
      ))}
    </Stack>
  )
}

export default BathList;