import * as path from "path";
import Datastore from "nedb";
import { emit, emitWarning } from "process";

// Define interface to describe a contact.  Note that we'll only have an _id field when retrieving or adding, so
// it has to be optional.
export interface IContact {
   _id?: number,
   name: string,
   email: string
}

// The worker that will perform contact operations.
export class Worker {
   private db: Nedb;

   /**
    * Constructor.
    */
   constructor() {
      this.db = new Datastore({
         filename: path.join(__dirname, "contacts.db"),
         autoload: true
      });
   } /* End constructor. */

   /**
    * Lists all contacts.
    *
    * @return A promise that eventually resolves to an array of IContact objects.
    */
   public listContacts(): Promise<IContact[]> {

      console.log("Contacts.Worker.listContacts()");

      return new Promise((inResolve, inReject) => {
         this.db.find(
            {},
            (inError: Error, inDocs: IContact[]) => {
               if (inError) {
                  console.log("Contacts.Worker.listContacts(): Error", inError);
                  inReject(inError);
               } else {
                  console.log("Contacts.Worker.listContacts(): Ok", inDocs);
                  inResolve(inDocs);
               }
            }
         );
      });

   } /* End listContacts(). */


   /**
    * Add a new contact.
    *
    * @param  inContact The contact to add.
    * @return           A promise that eventually resolves to an IContact object.
    */
   public addContact(inContact: IContact): Promise<IContact> {

      console.log("Contacts.Worker.addContact()", inContact);

      return new Promise((inResolve, inReject) => {
         this.db.insert(
            inContact,
            (inError: Error | null, inNewDoc: IContact) => {
               if (inError) {
                  console.log("Contacts.Worker.addContact(): Error", inError);
                  inReject(inError);
               } else {
                  console.log("Contacts.Worker.addContact(): Ok", inNewDoc);
                  inResolve(inNewDoc);
               }
            }
         );
      });

   } /* End addContact(). */


   /**
    * Delete a contact.
    *
    * @param  inID The ID of the contact to delete.
    * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
    */
   public deleteContact(inID: string): Promise<string | void> {

      console.log("Contacts.Worker.deleteContact()", inID);

      return new Promise((inResolve, inReject) => {
         this.db.remove(
            { _id: inID },
            {},
            (inError: Error | null, inNumRemoved: number) => {
               if (inError) {
                  console.log("Contacts.Worker.deleteContact(): Error", inError);
                  inReject(inError);
               } else {
                  console.log("Contacts.Worker.deleteContact(): Ok", inNumRemoved);
                  inResolve();
               }
            }
         );
      });

   } /* End deleteContact(). */


   /**
    * Update a contact.
    *
    * @param  inID The ID of the contact to update.
    * @param  inContact The new name and email for the contact to update.
    * @return      A promise that eventually resolves to an IContact object.
    */
   public updateContact(inID: string, inContact: IContact): Promise<void> {

      console.log("Contacts.Worker.updateContact()", inContact);

      return new Promise((inResolve, inReject) => {
         this.db.update(
            { _id: inID },
            { $set: { name: inContact.name, email: inContact.email } },
            { upsert: false },
            (inError: Error | null, inNumUpdated: number) => {
               if (inError) {
                  console.log("Contacts.Worker.deleteContact(): Error", inError);
                  inReject(inError);
               } else {
                  console.log("Contacts.Worker.deleteContact(): Ok,", "Number of replaced: " + inNumUpdated);
                  inResolve();
               }
            }
         );
      });
   }

} /* End class. */