import { Collections } from "@/lib/constants";
import { db } from "@/lib/firebase";
import { ImageService } from "./image";
import {
  Role,
  type HourRequest,
  type HourRequestInput,
  type User,
} from "@/lib/types";
import {
  addDoc,
  doc,
  collection as firebaseCollection,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export class RequestsService {
  static collection = firebaseCollection(db, Collections.HOUR_REQUESTS);
  static studentsCollection = firebaseCollection(db, Collections.STUDENTS);

  static submitNewRequest(
    formData: HourRequestInput,
    user: Partial<User>
  ): Promise<{ success: boolean }> {
    return new Promise(async (resolve, reject) => {
      try {
        const date = new Date();
        const obj = {
          workName: formData.workName,
          workSlab: formData.workSlab,
          workType: formData.workType,
          date: formData.date,
          description: formData.description,
          hours: formData.hours,
          status: "pending",
          proof: null,
          name: user.name,
          registrationNumber: user.registrationNumber,
          submitted: date.toISOString().split("T")[0],
        };

        // const res = await db.collection(Collections.HOUR_REQUESTS).add(obj);
        const res = await addDoc(this.collection, obj);
        if (formData.file) {
          const uploadResult = await ImageService.uploadImage(
            formData.file,
            res.id
          );
          await updateDoc(doc(db, Collections.HOUR_REQUESTS, res.id), {
            proof: uploadResult,
          });
        }
        resolve({ success: true });
      } catch (error) {
        reject("The request could not be submitted. Please try again later");
      }
    });
  }

  static async getHourRequests(user: Partial<User>): Promise<HourRequest[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const role = user.role;

        let snap;
        if (role == Role.ADMIN) {
          snap = await getDocs(this.collection);
        } else {
          snap = await getDocs(
            query(
              this.collection,
              where("registrationNumber", "==", user.registrationNumber)
            )
          );
        }
        const result = snap.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        }) as unknown as HourRequest[];

        resolve(result);
      } catch (error) {
        console.log(error);

        reject("Could not fetch hour requests");
      }
    });
  }

  static async getHourRequestsByRegistrationNumber(
    registrationNumber: string
  ): Promise<HourRequest[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = (
          await getDocs(
            query(
              this.collection,
              where("registrationNumber", "==", registrationNumber)
            )
          )
        ).docs;
        if (res.length === 0) resolve([]);
        resolve(
          res.map((r) => {
            return { id: r.id, ...r.data() } as unknown as HourRequest;
          })
        );
      } catch (error) {
        reject("Could not fetch hour requests");
      }
    });
  }

  static async handleRequestAction(id: string, action: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const ref = doc(this.collection, id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          return { success: false, error: "Request not found" };
        }

        const { hours, registrationNumber, proof } = snap.data();

        // 2. Update the request status
        const date = new Date();
        const formatted = date.toISOString().split("T")[0];
        const newData: {
          status: string;
          approved?: string;
          rejected?: string;
          // proof: any;
        } = { status: action };
        if (action === "approved") {
          newData.approved = formatted;
        } else if (action === "rejected") {
          newData.rejected = formatted;
        }

        await Promise.all([
          updateDoc(ref, newData),
          proof && ImageService.deleteImage(proof.path),
        ]);

        // 3. If approved → increment hours for student
        if (action === "approved") {
          const studentQuery = query(
            this.studentsCollection,
            where("registrationNumber", "==", registrationNumber)
          );

          const studentSnap = await getDocs(studentQuery);

          if (!studentSnap.empty) {
            await updateDoc(studentSnap.docs[0].ref, {
              hours: increment(hours),
            });
          }
        }

        resolve({ success: true });
      } catch (error) {
        console.log(error);

        reject("Could not update request status");
      }
    });
  }
}
