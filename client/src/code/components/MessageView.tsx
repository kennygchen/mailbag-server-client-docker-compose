// React imports.
import React, { useEffect, useRef } from "react";
import { InputBase } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";


/**
 * MessageView.
 */
const MessageView = ({ state }) => {
   const iframeRef = useRef(null);

   useEffect(() => {
      if (state.currentView === "message" && iframeRef.current) {
         const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
         iframeDoc.open();
         iframeDoc.write(state.messageBody);
         iframeDoc.close();
      }
   }, [state.currentView, state.messageBody]);

   return (
      <form>

         { /* ----- Message ID and date, just for informational purposes. ----- */}
         {state.currentView === "message" &&
            <InputBase defaultValue={`ID ${state.messageID}`} margin="dense" disabled={true} fullWidth={true}
               className="messageInfoField" />
         }
         {state.currentView === "message" && <br />}
         {state.currentView === "message" &&
            <InputBase defaultValue={state.messageDate} margin="dense" disabled={true} fullWidth={true}
               className="messageInfoField" />
         }
         {state.currentView === "message" && <br />}

         { /* ----- From. ----- */}
         {state.currentView === "message" &&
            <TextField margin="dense" variant="outlined" fullWidth={true} label="From" value={state.messageFrom}
               disabled={true} InputProps={{ style: { color: "#000000" } }} />
         }
         {state.currentView === "message" && <br />}

         { /* ----- To. ----- */}
         {state.currentView === "compose" &&
            <TextField margin="dense" id="messageTo" variant="outlined" fullWidth={true} label="To"
               value={state.messageTo} InputProps={{ style: { color: "#000000" } }}
               onChange={state.fieldChangeHandler} />
         }
         {state.currentView === "compose" && <br />}

         { /* ----- Subject. ----- */}
         <TextField margin="dense" id="messageSubject" label="Subject" variant="outlined" fullWidth={true}
            value={state.messageSubject} disabled={state.currentView === "message"}
            InputProps={{ style: { color: "#000000" } }} onChange={state.fieldChangeHandler} />
         <br />

         { /* ----- Message body. ----- */}

         {state.currentView === "message" ? (
            <iframe
               ref={iframeRef}
               title="Email Content"
               style={{
                  width: "100%",
                  height: "500px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#ffffff",
                  overflow: "auto",
               }}>
            </iframe>
         ) : (
            <TextField margin="dense" id="messageBody" variant="outlined" fullWidth={true} multiline={true} rows={12}
               value={state.messageBody} disabled={state.currentView === "message"}
               InputProps={{ style: { color: "#000000" } }} onChange={state.fieldChangeHandler} />
         )}

         { /* ----- Buttons. ----- */}

         {state.currentView === "compose" &&
            <Button variant="contained" color="primary" size="small" style={{ marginTop: 10 }}
               onClick={state.sendMessage}>
               Send
            </Button>
         }
         {state.currentView === "message" &&
            <Button variant="contained" color="primary" size="small" style={{ marginTop: 10, marginRight: 10 }}
               onClick={() => state.showComposeMessage("reply")}>
               Reply
            </Button>
         }
         {state.currentView === "message" &&
            <Button variant="contained" color="primary" size="small" style={{ marginTop: 10 }}
               onClick={state.deleteMessage}>
               Delete
            </Button>
         }

      </form>
   )

}; /* MessageView. */


export default MessageView;