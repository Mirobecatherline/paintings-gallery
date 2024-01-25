import { useEffect, useState } from "react"


export default function Product() {
  const [products, setProduct] = useState([])

  //add state
  const [productDetails, setProductDetails] = useState({
    title: "",
    thumbnail: "",
    description: "",

  })
  //change state after change on input
  function handleInput(event) {
    setProductDetails((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }


  function handleSubmit(event) {
    event.preventDefault()
    console.log(productDetails)
    //fetch api
    fetch("http://localhost:8000/products", {
      method: "POST",
      body: JSON.stringify(productDetails),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())
      .then((data) => {

        console.log(data.response)

        //clean fields afer suubmission
        setProductDetails({
          title: "",
          thumbnail: "",
          description: "",

        })

        //clear the pop response text

      }).catch((err) => console.log(err))

  }

  function handleSubmitUpdate(event, id) {
    event.preventDefault()
    console.log(productDetails)
    //fetch api
    fetch(`http://localhost:8000/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productDetails),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())
      .then((data) => {



        console.log(data.response)

        //clean fields afer suubmission
        setProductDetails({
          title: "",
          thumbnail: "",
          description: "",

        })

        //clear the pop response text

      }).catch((err) => console.log(err))

  }

  const deleteItem = async (e, id) => {
    try {
      await fetch(`http://localhost:8000/products/${id}`, {
        method: 'DELETE',
      });

      const updatedItems = products.filter((item) => item.id !== id);
      setProduct(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch('http://localhost:8000/products',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers as needed
            },
            // mode: 'cors', // Enable CORS
          });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let result = await response.json();
        setProduct(result);

      } catch (error) {
        console.log(error)

      }
    }
    fetchItem()
    console.log(products)

  }, [])

  return (
    <>
      {/* // navbar */}
      <div className="bg-light  d-flex p-3">
        <span className="fs-3">Paint App</span>
        <button className=" mx-auto btn btn-secondary " type="button"
          data-bs-toggle="modal" data-bs-target="#addModal" >Add Paint</button></div>

      {/* main section */}
      <div className="container">
        <div className="row">

          {products.map((item) => (
            <div className="card-container col-md-3" key={item.id}  >
              <div className="card">

                <img src={item.thumbnail} alt="" />  <p className="fw-bold text-center">{item.title}</p>
                <p className="card-text px-1 ">{item.description}</p>

                <div className="d-flex p-3">
                  <button className="btn btn-sm mx-auto btn-info" type="button"
                    data-bs-toggle="modal" onClick={(e) => { handleSubmitUpdate(e, item.id) }} data-bs-target="#updateModal">Update</button>

                  <button className="btn btn-sm btn-danger mx-auto " type="submit"
                    onClick={(e) => { window.location.reload(); }}>Delete</button>

                </div>

              </div>     </div>

          ))}

          <div className="modal fade" id="addModal" aria-labelledby="addModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Add paint</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form className="form-body mx-auto" onSubmit={handleSubmit}>
                    <input className="form-input" type="text" placeholder=" Enter title" name="title"
                      value={productDetails.title} required onChange={handleInput} />
                    <input className="form-input" type="text" placeholder="Enter image url here" name="thumbnail"
                      value={productDetails.thumbnail} required onChange={handleInput} />
                    <input className="form-input" required type="text" placeholder="Type description" name="description"
                      value={productDetails.description} onChange={handleInput} />

                    <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => { window.location.reload(); }}>Add</button>
                  </form>
                </div>
                <div className="modal-footer">

                </div>
              </div>
            </div>
          </div>


          <div className="modal fade" id="updateModal" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                  <form className="form-body mx-auto" onSubmit={handleSubmitUpdate}>
                    <input className="form-input" type="text" placeholder=" Enter title" name="title"
                      value={productDetails.title} required onChange={handleInput} />
                    <input className="form-input" type="text" placeholder="Enter image url here" name="thumbnail"
                      value={productDetails.thumbnail} required onChange={handleInput} />
                    <input className="form-input" type="text" placeholder="Type description" name="description"
                      value={productDetails.description} onChange={handleInput} />

                    <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal"  onClick={(e) => { window.location.reload(); }}>Add</button>
                  </form>


                </div>

              </div>
            </div>
          </div>

          <div className="card-body  bg-light rounded ">


          </div></div>
      </div>
    </>
  )
}
