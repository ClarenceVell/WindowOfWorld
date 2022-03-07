import React from 'react'
import AdminNav from '../parts/AdminNav'

function AddBook() {
  return (
    <div>
        <AdminNav/>
        <div className='add'>
            <h3>Add Book</h3>
            <form className='add-form'>
                <input type="text" name="" placeholder='Title' required />
                <input type="text" name="" placeholder='Publication Date' required/>
                <input type="number" name="" placeholder='Pages' required/>
                <input type="text" name="" placeholder='Author' required />
                <input type="number" name="" placeholder='ISBN' required/>
                <textarea name=""  cols="30" rows="10" placeholder='About This Book'></textarea>

                <div className='file-div'>
                    <input type="file" name="" id="file" hidden />
                    <label htmlFor="file" className='book-file'>
                        Attache Book File &nbsp;
                        <img src="/images/attach.png" alt="icon" height={'20px'}/>
                    </label>
                </div>

                <div className='button-add'>
                    <button className='btn add-button' type='submit'>
                        Add Book &nbsp;
                        <img src="/images/Add.png" alt="icon" />
                    </button>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default AddBook