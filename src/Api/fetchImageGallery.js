const API_KEY = '35821051-ff4ed7cb6cca304ad1608b196';

export function fetchImageGallery(inputValue, page) {
  return fetch(
    `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
