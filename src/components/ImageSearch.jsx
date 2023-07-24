
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard';

const fetchImages = async (searchTerm, page) => {
  
    const response = await axios.get(
      'https://api.unsplash.com/search/photos',
      {
        params: {
          query: `${searchTerm}`, 
          page: page,
          per_page:4, 
        },
        headers: {
          Authorization: 'Client-ID aTI7feLDOSbsYQOqyZZOOIMSLZO3V2TIUAZMvuQbuX4',
        },
      }
    );
    return response.data.results;
};

const ImageSearch = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef();
  const page = useRef(1);

  function pageChanegeHandler(p) {
    if (p < 1) {
        page.current = 1;
        return;
    }
    fetchImages(searchRef.current.value, page.current).then(results =>{
      setImages(
        results.map((image) => ({
          id: image.id,
          url: image.urls.regular,
          alt: image.alt_description,
          title: image.description || image.alt_description,
          description: 'Some image description here', 
          link: image.links.html,
        }))
      );
      setLoading(false);
  
  }).catch(error =>{
    console.error('Error fetching images:', error);
    setLoading(false);
  })
}

  const formSubmitHandler = (e) =>{
   e.preventDefault();
   fetchImages(searchRef.current.value, page.current).then(results =>{
    setImages(
      results.map((image) => ({
        id: image.id,
        url: image.urls.regular,
        alt: image.alt_description,
        title: image.description || image.alt_description,
        description: 'Some image description here', 
        link: image.links.html,
      }))
    );
    page.current = 2;
    setLoading(false);

}).catch(error =>{
  console.error('Error fetching images:', error);
  setLoading(false);
})
  }


  useEffect(() => {
  
    fetchImages('lion', page.current).then(results =>{
      setImages(
        results.map((image) => ({
          id: image.id,
          url: image.urls.regular,
          alt: image.alt_description,
          title: image.description || image.alt_description,
          description: 'Some image description here',
          link: image.links.html,
        }))
      );
      setLoading(false);

  }).catch(error =>{
    console.error('Error fetching images:', error);
    setLoading(false);
  })
  }, []);

  return (

    <div className="image-search">
      <form onSubmit={formSubmitHandler}>
        
        <input id='search' placeholder='Enter image name here' ref={searchRef} className="search-input"></input>
        <button > Search</button>
        
      </form>

      {loading ?(
        <div className="loading">Loading...</div>
      ) : (
        <div className="image-container">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
      <button onClick={() => { page.current = page.current - 1; pageChanegeHandler(page.current) }}>Previous Page</button>
      <button onClick={() => { page.current = page.current + 1; pageChanegeHandler(page.current) }}>Next Page</button>
    </div>
  );
};

export default ImageSearch;
