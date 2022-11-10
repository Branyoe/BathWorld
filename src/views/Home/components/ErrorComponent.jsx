import Box from "@mui/material/Box";

const ErrorComponent = ({ source, msg, imgSize}) => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        // height="30%"
        width="80%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <img src={source} width={imgSize ? imgSize : "100%"} alt="Imagen de error" />
        <p
          style={{
            fontWeight: 400,
            fontFamily: '"Poppins", sans-serif',
            color: "#565656"
          }}
        >{msg}</p>
      </Box>
    </Box>
  );
}

export default ErrorComponent