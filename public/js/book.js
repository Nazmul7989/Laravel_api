// alert('ok')

let bookTbody = $('#bookTbody');
let bookForm = $('#bookForm');
let books = [];
let editingBook = null;
let targetTr = null;

$(document).ready(function (){

    axios.get('http://127.0.0.1:8000/api/books')
        .then(res=>{
            let {data} = res;
            // books = data.data;
            books = data;
            // console.log(books);
            books.forEach( book =>{
                bookTbody.html(bookTbody.html() + `<tr>${makeTrcontent(book)}</tr>`);
                // bookTbody.innerHTML = bookTbody.innerHTML + `<tr>${makeTrcontent(book)}</tr>`;
            })
            // console.log(books)
        })
        .catch( err => console.log(err));

});

    bookForm.on('submit', function (e){
        e.preventDefault();

        let name = $('#name').val();
        let author = $('#author').val();
        let price = $('#price').val();
        let page = $('#page').val();
        // let image = $('#image')[0].files[0];
        // let image = document.querySelector('#image').files[0];
        // console.log(image);

        let  book = {name: name, author: author, price: price, page: page};
        // console.log(book);
        if (editingBook != null){
            //Axios request for update book
            axios.put('http://127.0.0.1:8000/api/books/'+editingBook.id, book)
                .then(res =>{
                    let {data, status, error} = res.data;

                    if (status){
                        targetTr.innerHTML = makeTrcontent(data)
                    }else {
                        alert(error);
                    }
                    books = books.filter( b => b.id != editingBook.id);
                    books.push(data);

                    resetForm();
                    $('#modalClose').click();

                })
                .catch(err => console.log(err))
        }else {

            // let formdata = new FormData();
            // formdata.append('name', name);
            // formdata.append('author', author);
            // formdata.append('price', price);
            // formdata.append('page', page);
            // formdata.append('image', image);


            // axios.post('http://127.0.0.1:8000/api/books', formdata,{
            //     // headers:{
            //     //     'Content_Type' : 'multipart/form_data'
            //     // }
            // })

            //Axios request for add book
            axios.post('http://127.0.0.1:8000/api/books', book)
                .then(res =>{
                    let {data} = res;

                    bookTbody.html(bookTbody.html() + `<tr>${makeTrcontent(data)}</tr>`);
                    books.push(data);

                    resetForm();
                    $('#modalClose').click();

                })
                .catch(err => console.log(err))
        }

    })

    const makeTrcontent = book =>{
        // <td>${book.image}</td>
        return `<td>${book.id}</td>
                <td>${book.name}</td>
                 <td>${book.author}</td>
                 <td>${book.price}</td>
                 <td>${book.page}</td>

                 <td>
                     <button type="submit" onclick="editBook(this, ${book.id})" data-target="#addBook" data-toggle="modal" class="btn-sm btn-primary">Edit</button>
                     <button type="submit" onclick="deleteBook(this, ${book.id})" class="btn-sm btn-danger">Delete</button>
                 </td>`
    }





const editBook = (ele, id) =>{
    editingBook = books.find(b => b.id == id);
    targetTr = ele.parentElement.parentElement;
    // console.log(book);
    $('#name').val(editingBook.name);
    $('#author').val(editingBook.author);
     $('#price').val(editingBook.price);
    $('#page').val(editingBook.page);

    $('#submitBtn').html('Update');
    $('#formTitle').html('Edit Book');

}


const deleteBook = (ele, id)=>{
    // console.log(ele, id);
    // console.log(ele.parentElement.parentElement.remove());

    axios.delete(`http://127.0.0.1:8000/api/books/${id}`)
        .then( ({data}) => {
           let { status, message} = data;

           if (status){
               ele.parentElement.parentElement.remove();
               books = books.filter( book => book.id != id);
               console.log(books);
           }else {
               alert(message);
           }
    })
        .catch(err => console.log(err))
}


const resetForm = ()=>{
    targetTr = null;
    editingBook = null;

    $('#name').val('');
    $('#author').val('');
    $('#price').val('');
    $('#page').val('');
    $('#submitBtn').html('Add')
    $('#formTitle').html('Add Book')
}

