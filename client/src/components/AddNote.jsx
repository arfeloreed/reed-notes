import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddNote() {
  const [note, setNote] = useState("");
  const { id } = useParams();
  const [error, setError] = useState("");

  // helper functions
  async function handleSubmit() {
    const data = { note };
    const url = process.env.REACT_APP_URL || "http://localhost:5000";

    try {
      const response = await axios.post(`${url}/book/${id}`, data);

      if (response.data.message === "success") {
        setError("");
        setNote("");
      } else setError("Can't add note");
    } catch (err) {
      console.log("Can't add a note: ", err);
      setError("Can't add note");
    }
  }

  return (
    <div className="addNote mt-5 p-5 rounded-3 mx-auto">
      <h2>Add a note</h2>

      {error && <p className="text-danger mb-3">{error}</p>}

      <form
        className="mt-4"
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSubmit();
        }}
      >
        <textarea
          name="note"
          id="note"
          rows="5"
          required
          value={note}
          onChange={(ev) => setNote(ev.target.value)}
        ></textarea>
        <input
          type="submit"
          value="Submit"
          className="mt-4 btn btn-outline-success btn-lg px-5"
        />
      </form>
    </div>
  );
}

export default AddNote;
