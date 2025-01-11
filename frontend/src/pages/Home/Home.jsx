import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { Toast } from "../../components/ToastMessage/Toast";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "",
  });
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  // Open model for edit
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // Show toast
  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  // Close toast
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      setUserInfo(data.user.fullName);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get-all-notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const notes = await response.json();
      setAllNotes(notes.notes);
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // Delete note
  const deleteNote = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await fetch(`${BASE_URL}/delete-note/` + noteId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const notes = await response.json();
      showToastMessage("Note Deleted Successfully", "delete");
      getAllNotes();
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // Search for a Note
  const onSearchNote = async (query) => {
    try {
      const response = await fetch(`${BASE_URL}/search-note/?query=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const notes = await response.json();
      console.log(notes);
      setIsSearch(true);
      setAllNotes(notes.notes);
    } catch (error) {
      console.log(error);
    }
  };

  // Update isPinned
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    const noteDataObj = {
      isPinned: !noteData.isPinned,
    };
    try {
      const response = await fetch(`${BASE_URL}/update-note-pinned/` + noteId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(noteDataObj),
      });

      const notes = await response.json();
      showToastMessage("Note Updated Successfully");
      getAllNotes();
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // Handle clear search
  const handleClearSearch = async () => {
    setIsSearch(false);
    getAllNotes();
  };

  // load when page load
  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes && allNotes.length > 0 ? (
            allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))
          ) : (
            <h1 className="text-center">No Notes Available.</h1>
          )}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
