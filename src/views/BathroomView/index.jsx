import { Avatar, Button, Divider } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState, useCallback } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { addComment, getBathroom, getCommentByUserEmailAndBathroomId, watchComments } from "../../DB";
import * as yup from "yup";
import { useFormik } from "formik";
import { Loading } from "../../components";
import { useAuth } from "../../context/authContext"
import { CommentsAndLocationTabs } from "./components/CommentsAndLocationTabs.jsx";
import RatingDialog from "./components/RatingDialog";
import appNavBarStore from "../../stores/appNavBarStore"

import "./index.css"
import { MyRating } from "./components/MyRating";
import { useNavigate, useParams } from "react-router-dom";
import bathroomViewStore from "../../stores/bathroomViewStore";

const LABEL_STYLES = {
  margin: 0,
  fontWeight: 400,
  fontSize: ".9rem",
  fontFamily: '"Poppins", sans-serif',
  color: "#606060"
}

export default function BathroomView() {
  const [comments, setComments] = useState([]);
  const [bathroom, setBathroom] = useState();
  const [hasComment, setHasComment] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [miniMap, setMiniMap] = useState(null);
  const [showRatingInp, setShowRatingInp] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();
  const navigator = useNavigate()
  const { setShow } = appNavBarStore(state => ({
    setShow: state.setShow
  }));
  const { route } = bathroomViewStore(state => ({
    route: state.route
  }))

  useEffect(() => {
    setShow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getB = async () => {
      const b = await getBathroom(id);
      setBathroom({ id: b.id, ...b.data() });
    }
    getB();
  }, [id]);


  const queryComments = useCallback(async () => {
    if (!bathroom) return
    await watchComments(bathroom?.id, setComments);
  }, [setComments, bathroom])

  const queryComment = useCallback(async () => {
    if (!bathroom) return
    const foundComment = await getCommentByUserEmailAndBathroomId(user.email, bathroom?.id);
    if (foundComment.length) {
      setHasComment(foundComment[0]);
      setRatingValue(foundComment[0].ratingValue)
      setShowRatingInp(true);
    }
  }, [bathroom, setHasComment, user])

  useEffect(() => {
    queryComment();
  }, [queryComment])

  useEffect(() => {
    queryComments()
  }, [queryComments])

  const commentVlidationSchema = yup.object({
    comment: yup
      .string('solo textor')
      .required('esto no puede estar vacio')
      .min(10, "mínimo 10 caracteres")
      .max(200, "maximo 200 caracteres")
  });

  const commentFormik = useFormik({
    initialValues: {
      comment: ""
    },
    validationSchema: commentVlidationSchema,
    onSubmit: async ({ comment }) => {
      await addComment(bathroom.id, user.email, comment);
      commentFormik.resetForm();
    }
  });

  const handleClose = () => {
    navigator(route);
  }

  if (!bathroom) return <Loading />

  const showRatingInpHanlder = () => {
    if (showRatingInp) {
      return (
        <Stack mx={2} mb={3} mt={2}>
          <p style={LABEL_STYLES}>Tu calificación</p>
          <Stack mt={.3}>
            <MyRating
              ratingValue={ratingValue}
              setRatingValue={setRatingValue}
              setOpenRatingDialog={setOpenRatingDialog}
            />
          </Stack>
        </Stack>
      );
    }
  }

  const showDisableRatingInp = () => {
    if (hasComment) {
      return (
        <Stack mx={2} mb={3} mt={2}>
          <p style={LABEL_STYLES}>Tu calificación</p>
          <Stack mt={.3}>
            <MyRating
              disable
              ratingValue={ratingValue}
              setRatingValue={setRatingValue}
              setOpenRatingDialog={setOpenRatingDialog}
            />
          </Stack>
        </Stack>
      );
    }
  }

  const showAttendanceField = () => {
    if (hasComment) return;
    return (
      <>
        <Stack mx={2} mb={3} mt={2}>
          <p style={LABEL_STYLES}>¿Has estado en este baño?</p>
          <Stack direction="row" spacing={1} mt={.3}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setShowRatingInp(true)}
            >Si</Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setShowRatingInp(false)}
            >No</Button>
          </Stack>
        </Stack>
        {showRatingInpHanlder()}
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          p: 0,
          m: 0,
          width: "100%",
          height: "100vh",
          overflow: "scroll"
        }}
      >
        {/* botón cerrar */}
        <Box
          sx={{
            position: "fixed",
            top: "10px",
            left: "2%",
            bgcolor: "#fff",
            height: "35px",
            width: "35px",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999
          }}
        >
          <CloseIcon color="#000" onClick={handleClose} />
        </Box>
        {/* contenedor img */}
        <Box height="25vh" >
          <Avatar variant="square" sx={{ height: "100%", width: "100vw" }} src={bathroom.mainPhoto}>
            <i style={{ color: "#fff", fontSize: "3rem" }} className="fa-solid fa-toilet"></i>
          </Avatar>
        </Box>
        {/* contenedor principal */}
        <Box sx={{
          height: "calc(100vh - 25vh)"
        }}>
          {/* contenedor nombre */}
          <Stack mx={2}>
            <div>
              <p
                style={{
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 800,
                  fontSize: "1.7rem",
                  padding: 0,
                  margin: "10px 0",
                }}
              >{bathroom.name}</p>
            </div>
          </Stack>
          {/* contenedor detalles */}
          <Stack mx={2}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                color: 'text.secondary',
                '& svg': {
                  m: 1.5,
                },
                '& hr': {
                  mx: 0.5,
                },
              }}
            >
              <Box mr={1}>
                <p style={LABEL_STYLES}>Valoración</p>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <p className="adress-text">
                    <i
                      className="fa-solid fa-poop"
                      style={{
                        marginRight: ".3rem",
                        color: "brown"
                      }}
                    ></i>
                    4.5
                  </p>
                </Box>
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box ml={1}>
                <p style={LABEL_STYLES}>Precio</p>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <p className="adress-text">
                    <i
                      className="fa-solid fa-tag"
                      style={{
                        marginRight: ".3rem"
                      }}
                    ></i>
                    {bathroom.type}
                  </p>
                </Box>
              </Box>
            </Box>
          </Stack>
          {showDisableRatingInp()}
          {showAttendanceField()}
          <CommentsAndLocationTabs
            bathroom={bathroom}
            miniMap={miniMap}
            setMiniMap={setMiniMap}
            data={comments}
          />
        </Box>
        <RatingDialog setShowRatingInp={setShowRatingInp} setHasComment={setHasComment} setRatingValue={setRatingValue} bathroom={bathroom} ratingValue={ratingValue} isOpen={openRatingDialog} setIsOpen={setOpenRatingDialog} />
      </Box>
    </>
  );
}