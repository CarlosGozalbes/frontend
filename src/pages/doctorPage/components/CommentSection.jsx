import React, { useState, useEffect } from "react";
import { useUser } from "../../../auth/useUser";
import {
  Button,
  CircularProgress,
  styled,
  Divider,
  TextareaAutosize as BaseTextareaAutosize,
} from "@mui/material";
import axios from "axios";
import { useToken } from "../../../auth/useToken";
import Comment from "./Comment";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

function CommentSection({ doctorId }) {
  const { user } = useUser();
  const [token] = useToken();
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [loadinga, setLoadinga] = useState(false);
const fetchComments = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL +"/comments/" + doctorId
        );
        console.log("Comments fetched:", response.data);
            // Get the comments from the response
            const allComments = response.data;
        
            // Filter out only the parent comments
            const parentComments = allComments.filter(comment => comment.itsParent);
            setComments(parentComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
  useEffect(() => {
    

    fetchComments();
  }, [doctorId, token]);

  const handleSubmit = async () => {
    try {
      setLoadinga(true);
      const response = await axios.post(
        import.meta.env.VITE_API_URL +"/comments",
        {
          content: commentContent,
          doctor: doctorId,
          
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Comment posted:", response.data);
      setCommentContent("");
      setComments([...comments, response.data]);
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoadinga(false);
    }
  };

  return (
    <>
      <Textarea
        width={"100%"}
        aria-label="minimum height"
        minRows={4}
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Escriba aqui su comentario..."
        margin="normal"
      />
      <Button
        color="primary"
        variant="outlined"
        size="large"
        onClick={handleSubmit}
      >
        {loadinga ? <CircularProgress size={24} /> : "Comentar"}
      </Button>
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      {comments.map((comment) => (
        <React.Fragment key={comment._id}>
          <Comment setComments={setComments} fetchComments={fetchComments} comment={comment} doctorId={doctorId} token={token} />
          <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        </React.Fragment>
      ))}
    </>
  );
}

export default CommentSection;
