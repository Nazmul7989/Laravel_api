alert('ok')
let bookTbody = $('#bookTbody');
let bookForm = $('#bookForm');
let books = [];
let edittingBook = null;
let targetTr = null;


$(document).ready(function(){
    alert('okyes')
    axios.get('http://127.0.0.1:8000/api/books').then(res => {

        let {data} = res;
        books = data;
        console.log(res.data)
        alert('ok')

        books.forEach( book => {
            bookTbody.html( bookTbody.html() +  `<tr>${makeTrContent(book)}</tr>`)
        })



    }).catch(err => console.log(err));
});

    bookForm.on('submit', function (e) {
        e.preventDefault()

        let bookName = $('#bookName').val()
        let authorName = $('#authorName').val()
        let bookPrice = $('#bookPrice').val()
        let bookPages = $('#bookPages').val()

        // let bookImage = $("#bookImage")[0].files[0]
        // let bookImage = document.querySelector('#bookImage').files[0];

        // console.log(bookImage);

        let book = {name: bookName, author: authorName, price: bookPrice, pages: bookPages}

        if(edittingBook != null){
            // Axios request for Update book
            axios.put('http://127.0.0.1:8000/api/books/'+edittingBook.id, book).then( res => {
                let {data, status, error} = res.data;

                if(status){
                    targetTr.innerHTML = makeTrContent(data)
                }else{
                    alert(error);
                }
                // books.push(data)
                $('#modalClose').click()
                resetForm();

            }).catch(err => console.log(err))

        }else{

            // Axios request for add book
            axios.post('http://127.0.0.1:8000/api/books', book).then( res => {
                let {data} = res;
                bookTbody.html( bookTbody.html() +  `<tr>${makeTrContent(data)}</tr>`)
                books.push(data)

                $('#modalClose').click()
                resetForm();

            }).catch(err => console.log(err))

        }




        // let formData = new FormData();

        // formData.append('name', bookName);
        // formData.append('author', authorName);
        // formData.append('price', bookPrice);
        // formData.append('pages', bookPages);
        // formData.append('images', bookImage);

        // axios.post('http://127.0.0.1:8000/api/books', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then( res => {
        //     let {data} = res;
        //     console.log(data);

        //     // bookTbody.html( bookTbody.html() +  `<tr>${makeTrContent(data)}</tr>`)
        //     // books.push(data)

        //     // $('#modalClose').click()

        // }).catch(err => console.log(err))
    })


    const makeTrContent = book => {
        return `<td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.price}</td>
        <td>${book.pages}</td>
        <td>
            <button onclick="editBook(this, ${book.id})" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#bookModal" >Edit</button>
            <button onclick="deleteBook(this, ${book.id})" class="btn btn-danger btn-sm">Delete</button>
        </td>`
    }



const editBook = (elm, id) =>{
    targetTr = elm.parentElement.parentElement;
    edittingBook = books.find( b => b.id == id)
    $('#bookName').val(edittingBook.name)
    $('#authorName').val(edittingBook.author)
    $('#bookPrice').val(edittingBook.price)
    $('#bookPages').val(edittingBook.pages)

    $('#submitBtn').html('Update');
}

const resetForm = () => {
    targetTr = null;
    edittingBook = null;
    $('#bookName').val("")
    $('#authorName').val("")
    $('#bookPrice').val("")
    $('#bookPages').val("")
    $('#submitBtn').html('ADD');
}

const deleteBook = (elm, id) => {
    // elm.parentElement.parentElement.remove()

    axios.delete(`http://127.0.0.1:8000/api/books/${id}`)
        .then( ({data}) => {

        let {status, message} = data;

        if(status){
            elm.parentElement.parentElement.remove()
            books = books.filter( book => book.id != id )
        }else{
            alert(message);
        }

    }).catch(err => console.log(err));
}
