import React, { useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";

const EditBooks = () => {
  const {id}=useParams();
  const { bookTitle,authorName,imageUrl,category,description,bookPdfUrl}=useLoaderData();
   const bookCategories = [
     "Fiction",
     "Non-Fiction",
     "Mistery",
     "Programming",
     "Science Fiction",
     "Fantasy",
     "Horror",
     "Bibliography",
     "Autobiography",
     "History",
     "Self-help",
     "Memoir",
     "Business",
     "Children Books",
     "Travel",
     "Religion",
     "Art and Design",
   ];
   const [selectedBookCategory, setSelectedBookCategory] = useState(
     bookCategories[0]
   );
   const handleChangeSelectedValue = (event) => {
     console.log(event.target.value);
     setSelectedBookCategory(event.target.value);
   };

   const handleUpdate = (event) => {
     event.preventDefault();
     const form = event.target;

     const bookTitle = form.bookTitle.value;
     const authorName = form.authorName.value;
     const imageUrl = form.imageUrl.value;
     const category = form.categoryName.value;
     const description = form.description.value;
     const bookPdfUrl = form.bookPdfUrl.value;

     const updateBookObj = {
       bookTitle,
       authorName,
       imageUrl,
       category,
       description,
       bookPdfUrl,
     };

    //  console.log(bookObj);
    //update book data
    fetch(`http://localhost:5000/book/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(updateBookObj)
    }).then(res=>res.json()).then(data=>{
      alert("Book is updated successfully!!!")
    })

    
   };

   return (
     <div className="px-4 my-12">
       <h2 className="mb-8 text-3xl font-bold">Upload the book data</h2>
       <form
         onSubmit={handleUpdate}
         className="flex lg:w-[1000px] flex-col flex-wrap gap-4"
       >
         {/* first row */}
         <div className="flex gap-8">
           <div className="lg:w-1/2">
             <div className="mb-2 block">
               <Label htmlFor="bookTitle" value="Book Title" />
             </div>
             <TextInput
               id="bookTitle"
               name="bookTitle"
               type="text"
               placeholder="Book Name"
               defaultValue={bookTitle}
               required
             />
           </div>
           {/* author name */}
           <div className="lg:w-1/2">
             <div className="mb-2 block">
               <Label htmlFor="authorName" value="Author Name" />
             </div>
             <TextInput
               id="authorName"
               name="authorName"
               type="text"
               placeholder="Author Name"
               defaultValue={authorName}
               required
             />
           </div>
         </div>
         {/* second row */}
         <div className="flex gap-8">
           <div className="lg:w-1/2">
             <div className="mb-2 block">
               <Label htmlFor="imageUrl" value="Book Image Url" />
             </div>
             <TextInput
               id="imageUrl"
               name="imageUrl"
               type="text"
               placeholder="Book Image Url"
               defaultValue={imageUrl}
               required
             />
           </div>
           {/* category */}
           <div className="lg:w-1/2">
             <div className="mb-2 block">
               <Label htmlFor="inputState" value="Book Category" />
             </div>
             <Select
               id="inputState"
               name="categoryName"
               className="w-full rounded"
               value={selectedBookCategory}
               onChange={handleChangeSelectedValue}
             >
               {bookCategories.map((option) => (
                 <option key={option} value={option}>
                   {option}
                 </option>
               ))}
             </Select>
           </div>
         </div>
         {/* book description */}

         <div>
           <div className="mb-2 block">
             <Label htmlFor="description" value="Book Description" />
           </div>
           <Textarea
             id="description"
             name="description"
             placeholder="Write your book description here..."
             required
             className="w-full"
             rows={6}
             defaultValue={description}
           />
         </div>
         {/* book pdf link */}

         <div>
           <div className="mb-2 block">
             <Label htmlFor="bookPdfUrl" value="Book Pdf Url" />
           </div>
           <TextInput
             id="bookPdfUrl"
             name="bookPdfUrl"
             type="text"
             placeholder="Book pdf url"
             defaultValue={bookPdfUrl}
             required
           />
         </div>

         <Button type="submit" className="mt-5">
           Update  Book
         </Button>
       </form>
     </div>
   );
}

export default EditBooks