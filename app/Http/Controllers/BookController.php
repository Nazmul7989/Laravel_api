<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Image;


class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        $books = Book::paginate(1);
        $books = Book::all();
        return $books;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        if ($request->file('image')){
//            $file      = $request->file('image');
//            $extension = $file->getClientOriginalExtension();
//            $image     = 'Books_'.time().'.'.$extension;
//            Image::make($file)->resize(500,500)->save(public_path()."/images/".$image);
//        }

        return Book::create([

            'name'   => $request->name,
            'author' => $request->author,
            'price'  => $request->price,
            'page'   => $request->page,
//            'image'  => $image
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $book = Book::findOrFail($id);
        return $book;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $res = [
            'status' => true,
            'data'   => null,
            'error'  => null
        ];

        $book = Book::find($id);

        if ($book){
            $name   = $request->name;
            $author = $request->author;
            $price  = $request->price;
            $page   = $request->page;

            if ($name){
                $book->name = $name;
            }
            if ($author){
                $book->author = $author;
            }
            if ($price){
                $book->price = $price;
            }
            if ($page){
                $book->page = $page;
            }

            $book->save();
            $res['status'] = true;
            $res['data']   = $book;
//            $res['data']   = $book;
        }else{
            $res['status']  = false;
            $res['error'] = 'Book  not found';
        }

        return $res;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)

    {
        $res = [
            'status'  => true,
            'message' => ''
         ];

        $book = Book::find($id);

        if ($book){
            $book->delete();
            $res['status']  = true;
            $res['message'] = 'Book deleted successful';
        }else{
            $res['status']  = false;
            $res['message'] = 'Book deleted unsuccessful';
        }

        return $res;

    }
}
