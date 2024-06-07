import React, { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  styled,
} from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useUser } from "../../../auth/useUser";

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

function Comment({ comment, doctorId, token,setComments,fetchComments }) {
  const { user } = useUser();
  const [replyContent, setReplyContent] = useState("");
  const [loadinga, setLoadinga] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  useEffect(() => {
    console.log("Comment:", comment._id, "replies:", comment.replies);
  }, []);

  const handleReplyToggle = (commentId) => {
    setActiveReplyId((prevId) => (prevId === commentId ? null : commentId));
  };

  const handleReplySubmit = async (commentId) => {
    try {
      setLoadinga(true);
      const response = await axios.post(
        import.meta.env.VITE_API_URL +"/comments",
        {
          content: replyContent,
          doctor: doctorId,
          parentId: commentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Reply posted:", response.data);
      setReplyContent("");
      setActiveReplyId(null);
     await fetchComments()
    } catch (error) {
      console.error("Error posting reply:", error);
    } finally {
      setLoadinga(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };
  const handleDeleteSubmit = async () => {
    try {
      setLoadinga(true);
      const response = await axios.delete(
        import.meta.env.VITE_API_URL +`/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Comment deleted or updated:", response.data);
     await fetchComments()
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoadinga(false);
    }
  };
  const handleEditSubmit = async () => {
    try {
      setLoadinga(true);
      const response = await axios.put(
        import.meta.env.VITE_API_URL +`/comments/${comment._id}`,
        {
          content: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Comment updated:", response.data);
      setIsEditing(false);
      await fetchComments()
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setLoadinga(false);
    }
  };

  return (
    <Paper style={{ padding: "10px" }}>
      <Grid container wrap="nowrap" spacing={2} sx={{ p: 3 }}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={comment.author.avatar} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>
            {comment.author.name} {comment.author.surname}
          </h4>
          {isEditing ? (
            <Textarea
              width={"100%"}
              aria-label="minimum height"
              minRows={4}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Edit your comment..."
              margin="normal"
            />
          ) : (
            comment.author.name !== "comentario" &&
            comment.author.surname !== "eliminado" && (
              <p style={{ textAlign: "left" }}>{comment.content}</p>
            )
          )}
        </Grid>
      </Grid>
      {comment.author.name !== "comentario" &&
        comment.author.surname !== "eliminado" && (
          <Grid container alignItems="center" wrap="nowrap" spacing={2} sx={{ p: 3 }}>
            <Grid item>
              <Typography
                component="h2"
                variant="body2"
                align="left"
                color="text.primary"
                sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                onClick={() => handleReplyToggle(comment._id)}
              >
                Responder <ArrowDropDownIcon />
              </Typography>
            </Grid>
            {user?._id === comment.author._id && (
              <Grid item>
                <IconButton aria-label="edit" size="large" onClick={handleEditToggle}>
                  <SaveIcon />
                </IconButton>
              </Grid>
            )}
            {user?._id === comment.author._id && (
              <Grid item>
                <IconButton aria-label="delete" size="large" onClick={handleDeleteSubmit}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            )}
             {isEditing && (
        <Grid item>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={handleEditSubmit}
          >
            {loadinga ? <CircularProgress size={24} /> : "Guardar"}
          </Button>
        </Grid>
      )}
          </Grid>
        )}
      {activeReplyId === comment._id && (
        <Grid container wrap="nowrap" spacing={2} sx={{ p: 3 }}>
          <Textarea
            width={"100%"}
            aria-label="minimum height"
            minRows={4}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Escriba aqui su respuesta..."
            margin="normal"
          />
          <Button
            color="primary"
            variant="outlined"
            size="large"
            onClick={() => handleReplySubmit(comment._id)}
          >
            {loadinga ? <CircularProgress size={24} /> : "Responder"}
          </Button>
        </Grid>
      )}
     
      {comment.replies.map((reply) => (
        <Comment
          key={reply._id}
          comment={reply}
          doctorId={doctorId}
          token={token}
          fetchComments={fetchComments}
        />
      ))}
    </Paper>
  );
}

export default Comment;
