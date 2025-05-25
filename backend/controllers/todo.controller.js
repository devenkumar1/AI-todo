import firebase from '../config/firebase.config.js';
import Todos from '../models/todo.model.js';



import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);


export const createTodo=async(req,res)=>{
    const {title,description,isCompleted}=req.body;
try{
await addDoc(collection(db,'todos'),{title,description,isCompleted});
res.status(201).json({message:'todo created successfully'});
}catch(err){
console.log("Error occured in creating todo",err);
res.status(500).json({message:'Error occured in creating todo'});
}

}
