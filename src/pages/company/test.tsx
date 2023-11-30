
import { useEffect, useState } from 'react';

const TestPage = () => {
  const [catFact, setCatFact] = useState('');

  useEffect(() => {
    const fetchCatFact = async () => {
      try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        setCatFact(data.fact);
      } catch (error) {
        console.error('Error fetching cat fact:', error);
      }
    };

    fetchCatFact();
  }, []);

  return (
    <div>
      <h1>Cat Fact:</h1>
      <p>{catFact}</p>
    </div>
  );
};

export default TestPage;
