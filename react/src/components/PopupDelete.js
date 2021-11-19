import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { deleteUser } from "../data/repository";
import { useHistory } from "react-router-dom";

const PopupDelete = (props) => {
  let history = useHistory();

  //useState hook for showing the modal pop up
  const [show, setShow] = useState(false);

  //event handler for closing the modal pop up
  const handleClose = () => {
    setShow(false);
  };
  //event handler for opening the modal pop up
  const handleShow = () => setShow(true);
  //event handler for deleting a user as well as the related posts and comments from the user.
  const handleDelete = async () => {
    //log the user out
    await deleteUser(props.user);
    history.push("/login");
    props.logoutUser();
    //filter out the remaining posts
    const removePosts = props.posts.filter(
      (post) => post.userEmail !== props.user.email
    );
    //filter out the remaining comments
    const removeComments = props.comments.filter(
      (comment) => comment.userEmail !== props.user.email
    );
    props.setPosts(removePosts);
    props.setComments(removeComments);
    //set the new data with the deleted user on local storage
    /* localStorage.setItem("users", JSON.stringify(removeUser));

    //set the new data with the deleted posts of the user on local storage
    localStorage.setItem("posts", JSON.stringify(removePosts));
    props.setPosts(removePosts);

    //set the new data with the deleted posts of the user on local storage
    localStorage.setItem("comments", JSON.stringify(removeComments));
    props.setComments(removeComments); */
  };
  return (
    <>
      <Button variant="outline-danger ms-2" size="sm" onClick={handleShow}>
        Delete Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirm to delete your account</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Link to="/">
            <Button
              variant="btn btn-blue-left"
              onClick={() => {
                handleClose();
                handleDelete();
              }}
            >
              Confirm
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupDelete;
