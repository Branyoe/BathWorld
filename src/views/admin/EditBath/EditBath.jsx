import React from "react";
import EditBath from "./index";

const AdminEditBath = () => {
  const bathData = {
    name: "Baño Los Rojos",
    address: "123 Calle Principal",
    lat: 19.4326,
    lng: -99.1332,
    imgUrl: "https://baño.com/image-baño.jpg",
    type: "public",
    tags: ["oxxo", "escuela"]
  };

  return (
    <div>
      <EditBath bath={bathData} />
    </div>
  );
};

export default AdminEditBath;
