import { useState } from 'react';
import BookMarkModal from '../components/modals/BookMarkModal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => setIsModalOpen(true)}>북마크</button>
      {isModalOpen && <BookMarkModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Home;
