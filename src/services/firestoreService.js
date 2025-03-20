import {db} from '../Firebase'
import {doc,setDoc,arrayUnion} from 'firebase/firestore'

export const saveLocation = async (userId, location) => {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { savedLocations: arrayUnion(location) }, { merge: true });
}