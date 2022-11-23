import { Avatar, Divider, Paper } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState, useCallback } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { addComment, getBathroom, getCommentByUserEmailAndBathroomId, setTotalBathRating, watchComments } from "../../DB";
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
// import { MapContext } from "../../context";

const LABEL_STYLES = {
  margin: 0,
  fontSize: ".9rem",
  color: "#606060",
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 400,
}

export default function BathroomView() {
  // const {setMiniMapMarker, miniMapMarker} = useContext(MapContext)
  const [comments, setComments] = useState([]);
  const [bathroom, setBathroom] = useState();
  const [hasComment, setHasComment] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  //eslint-disable-next-line 
  const [showRatingInp, setShowRatingInp] = useState(false);
  const [totalRating, setTotalRating] = useState(0);
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
    // setMiniMapMarker(null);
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

  const saveTotalRating = async (value) => {
    await setTotalBathRating(id, value);
  }

  const calcRating = () => {
    let sum = 0;
    if (!comments.length) return 0
    for (let comment of comments) {
      sum += comment.ratingValue;
    }
    return sum / comments.length;
  }

  useEffect(() => {
    if (!bathroom || !comments.length) return
    const res = calcRating()
    // if(res === bathroom.totalRating) return;
    saveTotalRating(res);
    setTotalRating(res);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bathroom, comments]);

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
    onSubmit: ({ comment }) => {
      addComment(bathroom.id, user.email, comment);
      commentFormik.resetForm();
    }
  });

  const handleClose = () => {
    // console.log(marker);
    // marker.getElement().remove();
    // miniMapMarker.forEach(m => m.remove());
    // setMiniMapMarker([])
    navigator(route);
  }

  if (!bathroom) return <Loading />

  const RatingInp = () => (
    <Paper
      elevation={3}
      sx={{
        mx: 1,
        mt: .3,
        padding: '10px',
      }}
    >
      <Stack>
        <p style={LABEL_STYLES}>¿Has visitado este baño? Califícalo.</p>
        <Stack mt={.8}>
          <MyRating
            ratingValue={ratingValue}
            setRatingValue={setRatingValue}
            setOpenRatingDialog={setOpenRatingDialog}
          />
        </Stack>
      </Stack>
    </Paper>
  )

  const showDisableRatingInp = () => {
    if (hasComment) {
      return (
        <Paper
          elevation={3}
          sx={{
            mx: 1,
            mt: .3,
            padding: '10px',
          }}
        >
          <Stack>
            <p style={LABEL_STYLES}>Tu calificación.</p>
            <Stack mt={.8}>
              <MyRating
                disable
                ratingValue={ratingValue}
                setRatingValue={setRatingValue}
                setOpenRatingDialog={setOpenRatingDialog}
              />
            </Stack>
          </Stack>
        </Paper>
      );
    }
    return (
      <>
        {RatingInp()}
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
                  fontWeight: 700,
                  fontSize: "1.7rem",
                  padding: 0,
                  margin: "10px 0",
                  fontFamily: "'Roboto', sans-serif",
                  color: "#161616",
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
                        color: "#745e3d"
                      }}
                    ></i>
                    {totalRating ? totalRating.toFixed(1) : "S/N"}
                  </p>
                </Box>
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box ml={1}>
                <p style={LABEL_STYLES}>Tipo:</p>
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
                    {bathroom.cost}
                  </p>
                </Box>
              </Box>
            </Box>
          </Stack>
          <Stack mx={1} mb={3} mt={2}>
            {showDisableRatingInp()}
          </Stack>
          <CommentsAndLocationTabs
            bathroom={bathroom}
            data={comments}
          />
        </Box>
        <RatingDialog
          setShowRatingInp={() => { }}
          setHasComment={setHasComment}
          setRatingValue={setRatingValue}
          bathroom={bathroom}
          ratingValue={ratingValue}
          isOpen={openRatingDialog}
          setIsOpen={setOpenRatingDialog}
        />
      </Box>
    </>
  );
}