// React imports.
import React from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";



/**
 * EditContactView.
 */
const EditContactView = ({ state }) => (

   <form>

      <TextField margin="dense" id="editedContactName" label="Name" value={state.editedContactName} variant="outlined"
         InputProps={{ style: { color: "#000000" } }} style={{ width: 260 }}
         onChange={state.fieldChangeHandler} />
      <br />
      <TextField margin="dense" id="editedContactEmail" label="Email" value={state.editedContactEmail} variant="outlined"
         InputProps={{ style: { color: "#000000" } }} style={{ width: 520 }}
         onChange={state.fieldChangeHandler} />
      <br />
      { /* Hide.show buttons as appropriate.  Note that we have to use this form of onClick() otherwise the event  */}
      { /* object would be passed to addContact() and the branching logic would fail. */}

      {state.currentView === "contactEdit" &&
         <Button variant="contained" color="primary" size="small" style={{ marginTop: 10, marginRight: 10 }}
            onClick={() => state.updateContact()}>
            Save
         </Button>
      }
      {state.currentView === "contactEdit" &&
         <Button variant="contained" color="primary" size="small" style={{ marginTop: 10, marginRight: 10 }}
            onClick={() => state.showContact(state.contactID, state.contactName, state.contactEmail)}>
            Cancel
         </Button>
      }

   </form>

); /* ContactView. */


export default EditContactView;