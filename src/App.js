import React, {useState, useEffect} from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');  

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=15992704-ea65d0aeb1dd5a1d27bb12d2c&q=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => {
      setImages(data.hits)
      setIsLoading(false)
    })
    .catch(error => console.log(error))
  },[query])

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setQuery(text)} />

      {
        !isLoading && images.length === 0 && 
        <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>
      }
      <div className="grid md:grid-cols-3 sm:grid-cols-1 sm:ml-4 gap-4">
        {images.map(image => (
          <ImageCard key={image.id} image={image}  />
        ))}
      </div>
    </div>
  );
}

export default App;
